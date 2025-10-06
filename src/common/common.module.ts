import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from './success-response.interceptor';
import { ErrorResponseFilter } from './error-response.filter';
import { AuthMiddleware } from 'src/auth/auth.middleware';
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
      useClass: ErrorResponseFilter,
    },
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude('/v1/api/auth/login', '/v1/api/auth/register')
      .forRoutes('/v1/api');
  }
}
