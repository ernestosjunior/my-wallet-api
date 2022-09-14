import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUser } from './dto/user.type';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: NewUser): Promise<User | Error> {
    return this.usersService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | Error> {
    return this.usersService.getUserById(id);
  }
}
