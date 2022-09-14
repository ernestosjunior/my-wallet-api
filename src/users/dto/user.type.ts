import { ApiProperty } from '@nestjs/swagger';

export class NewUser {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
