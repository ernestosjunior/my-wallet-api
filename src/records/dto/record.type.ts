import { ApiProperty } from '@nestjs/swagger';

export class NewRecord {
  @ApiProperty()
  type: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  value: number;

  userId: string;
}
