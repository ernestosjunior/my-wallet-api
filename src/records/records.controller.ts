import {
  Controller,
  UseGuards,
  Post,
  Body,
  BadRequestException,
  Get,
  Request,
} from '@nestjs/common';
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
  async createUser(
    @Body() { type, description, value }: NewRecord,
    @Request() req: any,
  ): Promise<Record> {
    if (!type || !description)
      throw new BadRequestException(
        'Send all fields. {type, description, value}.',
      );

    const types = ['entry', 'exit'];
    if (!types.includes(type))
      throw new BadRequestException(
        'Send correct type of record. <entry | exit>.',
      );

    return this.recordsService.createRecord({
      type,
      description,
      value,
      userId: req.user.id,
    });
  }

  @Get()
  async getRecordsByUser(@Request() req: any): Promise<Record[]> {
    return this.recordsService.getRecordsByUser(req.user.id);
  }
}
