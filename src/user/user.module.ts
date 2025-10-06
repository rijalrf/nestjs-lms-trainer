import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repo';
import { HashService } from 'src/helper/hash/hash.service';
import { ErrorFilterFilter } from 'src/common/error-filter/error-filter.filter';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    HashService,
    ErrorFilterFilter,
  ],
  exports: [UserService],
})
export class UserModule {}
