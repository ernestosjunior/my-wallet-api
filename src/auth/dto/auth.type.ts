import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export type AuthType = {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
};
