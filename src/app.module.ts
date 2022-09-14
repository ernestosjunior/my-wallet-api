import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [UsersModule, AuthModule, RecordsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
