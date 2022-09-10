import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}
