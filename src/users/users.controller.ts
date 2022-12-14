import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUser } from './dto/user.type';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() { name, email, password }: NewUser): Promise<User> {
    if (!name || !email || !password)
      throw new BadRequestException(
        'Send all fields. {name, email, password}.',
      );

    const res = await this.usersService.createUser({ name, email, password });

    if (!res) throw new BadRequestException('User already exists.');

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserById(@Request() req: any): Promise<User> {
    const user = await this.usersService.getUserById(req.user.id);

    if (!user) throw new BadRequestException('User not found.');

    return user;
  }
}
