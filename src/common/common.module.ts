import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SuccessResponseInterceptor } from './success-response/success-response.interceptor';
import { ErrorFilterFilter } from './error-filter/error-filter.filter';

@Module({
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
export class CommonModule {}
