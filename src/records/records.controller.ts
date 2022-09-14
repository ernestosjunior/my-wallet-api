import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RecordsService } from './records.service';
import { Record } from '@prisma/client';
import { NewRecord } from './dto/record.type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Record')
@UseGuards(JwtAuthGuard)
@Controller('record')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @Post()
  async createUser(@Body() record: NewRecord): Promise<Record> {
    return this.recordsService.createRecord(record);
  }
}
