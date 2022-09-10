import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { NewUser } from './dto/user.type';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: NewUser): Promise<User> {
    return this.usersService.createUser(user);
  }
}
