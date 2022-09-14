import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { Record } from '@prisma/client';
import { NewRecord } from './dto/record.type';

@Injectable()
export class RecordsService {
  constructor(private prisma: PrismaService) {}

  async createRecord({
    type,
    description,
    value,
    userId,
  }: NewRecord): Promise<Record> {
    const types = ['entry', 'exit'];
    if (!types.includes(type))
      throw new BadRequestException(
        'Send correct type of record. Entry or exit.',
      );

    const record = await this.prisma.record.create({
      data: { type, description, value, user: { connect: { id: userId } } },
    });

    return record;
  }
}
