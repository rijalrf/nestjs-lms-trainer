import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { HashService } from 'src/helper/hash/hash.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashService],
})
export class AuthModule {}
