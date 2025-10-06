import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { HashService } from 'src/helper/hash/hash.service';
import { SuccessResponseInterceptor } from 'src/common/success-response.interceptor';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, HashService, SuccessResponseInterceptor],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/v1/api/auth/login', '/v1/api/auth/register')
      .forRoutes('/v1/api');
  }
}
