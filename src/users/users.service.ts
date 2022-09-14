import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma';
import { encryptPassword } from 'src/utils/crypto';
import { NewUser } from './dto/user.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser({ name, email, password }: NewUser): Promise<User | null> {
    const hasUser = await this.prisma.user.findUnique({ where: { email } });

    if (hasUser) return null;

    const user = await this.prisma.user.create({
      data: { name, email, password: encryptPassword(password) },
    });

    delete user.password;
    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) return null;

    delete user.password;
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }
}
