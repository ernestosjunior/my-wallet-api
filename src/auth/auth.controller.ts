import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput, AuthType } from './dto/auth.type';

@Controller('login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createUser(@Body() { email, password }: AuthInput): Promise<AuthType> {
    return this.authService.login({ email, password });
  }
}
