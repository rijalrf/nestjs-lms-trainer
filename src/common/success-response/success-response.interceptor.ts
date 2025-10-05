import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { Message } from '../decorator/message.decorator';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const code = context.switchToHttp().getResponse().statusCode;
    const message = this.reflector.get<string>(Message, context.getHandler());

    return next.handle().pipe(
      map((result: any) => {
        if (result && result.data && result.pagination) {
          const { data, pagination } = result;
          return {
            success: true,
            code,
            message,
            data: data,
            pagination: pagination,
          };
        }
        return {
          success: true,
          code,
          message,
          data: result,
        };
      }),
    );
  }
}
