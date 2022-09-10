import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { AuthInput, AuthType } from './dto/auth.type';
import { decryptPassword } from 'src/utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: AuthInput): Promise<AuthType> {
    const user = await this.usersService.getUserByEmail(email);
    const isValidPassword = decryptPassword(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials.');
    }

    const token = await this.jwtToken(user);

    delete user.password;

    return { user, token };
  }

  private async jwtToken({ name, id }: User): Promise<string> {
    return this.jwtService.signAsync({ name, id });
  }
}
