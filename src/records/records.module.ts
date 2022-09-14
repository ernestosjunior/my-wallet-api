import { Module } from '@nestjs/common';
import { RecordsService } from './records.service';
import { PrismaService } from 'src/prisma';
import { RecordsController } from './records.controller';

@Module({
  providers: [RecordsService, PrismaService],
  controllers: [RecordsController],
})
export class RecordsModule {}
