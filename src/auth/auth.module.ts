import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET,
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [AuthService, PrismaService, UsersService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
