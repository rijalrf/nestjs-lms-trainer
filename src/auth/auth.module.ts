import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { HashService } from 'src/helper/hash/hash.service';
import { AuthMiddleware } from './auth.middleware';
import { SuccessResponseInterceptor } from 'src/common/success-response.interceptor';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashService, SuccessResponseInterceptor],
  exports: [AuthService],
})
export class AuthModule {}
// export class AuthModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(AuthMiddleware).forRoutes('/v1/api/users/');
//   }
// }
