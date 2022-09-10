import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  main(): { name: string } {
    return { name: 'my-wallet-api' };
  }
}
