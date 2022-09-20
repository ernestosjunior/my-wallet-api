import { Injectable, BadRequestException } from '@nestjs/common';
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
    if (!email || !password) {
      throw new BadRequestException('Send all fields. {email, password}.');
    }
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found.');
    }
    const isValidPassword = decryptPassword(password, user.password);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid credentials.');
    }

    const token = await this.jwtToken(user);

    delete user.password;

    return { user, token };
  }

  private async jwtToken({ name, id }: User): Promise<string> {
    return this.jwtService.signAsync({ name, id });
  }
}
