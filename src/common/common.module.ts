import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from './success-response/success-response.interceptor';
import { ErrorFilterFilter } from './error-filter/error-filter.filter';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { UserService } from 'src/user/user.service';
import { HashService } from 'src/helper/hash/hash.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilterFilter,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/v1/api/auth/login', '/v1/api/auth/register')
      .forRoutes('/v1/api/*');
  }
}
