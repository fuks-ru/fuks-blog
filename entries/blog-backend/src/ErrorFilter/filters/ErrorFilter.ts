import { Logger } from '@difuks/common';
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Response } from 'express';

import { IErrorResponse } from 'blog-backend/ErrorFilter/dto/IErrorResponse';
import {
  ErrorCode,
  SystemError,
} from 'blog-backend/SystemError/dto/SystemError';

@Injectable()
export class ErrorFilter implements ExceptionFilter {
  public constructor(private readonly logger: Logger) {}

  /**
   * Обрабатывает все ошибки приложения.
   */
  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error('Произошла ошибка', {
      extra: {
        error: exception,
        stack: exception.stack,
      },
    });

    if (exception instanceof SystemError) {
      response
        .status(exception.httpStatus)
        .json(this.formatResponse(exception.code, exception.message));

      return;
    }

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(this.formatResponse(ErrorCode.OTHER, exception.message));
  }

  private formatResponse(code: ErrorCode, message: string): IErrorResponse {
    return {
      code,
      message,
    };
  }
}
