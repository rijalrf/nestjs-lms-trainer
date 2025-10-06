import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError, HttpException, Error)
export class ErrorResponseFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof ZodError) {
      response.status(400).json({
        success: false,
        code: 400,
        message: 'Validation failed',
        errors: exception.issues.map((issue) => ({
          field: issue.path.join('.'),
          error: issue.message,
        })),
      });
    } else if (exception instanceof HttpException) {
      response.status(exception.getStatus()).json({
        success: false,
        code: exception.getStatus(),
        message: exception.message,
      });
    } else {
      response.status(500).json({
        success: false,
        code: 500,
        message: 'Internal server error',
        errors: exception,
      });
    }
  }
}
