import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException, Error)
export class ErrorFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof ZodError) {
      response.status(400).json({
        success: false,
        code: 400,
        message: exception.issues,
        data: null,
      });
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        success: false,
        code: exception.getStatus(),
        message: exception.message,
        data: null,
      });
    } else {
      response.status(500).json({
        success: false,
        code: 500,
        message: exception,
        data: null,
      });
    }
  }
}
