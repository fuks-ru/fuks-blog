import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  API_PAGE_PREFIX,
  API_PREFIX,
} from '@fuks/blog-frontend/src/common/utils/constants';
import { IPageProps } from '@fuks/blog-frontend/src/common/types/page/IPageProps';

import { Logger } from '../../Logger/services/Logger';

@Injectable()
export class ErrorFilter implements ExceptionFilter {
  public constructor(private readonly logger: Logger) {}

  /**
   * Обрабатывает все ошибки приложения.
   */
  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isApi = request.url.includes(API_PREFIX);
    const isApiPage = request.url.includes(API_PAGE_PREFIX);

    const title = 'Произошла ошибка';

    if (!request.url?.includes('_next')) {
      this.logger.error(title, {
        extra: {
          error: exception,
          stack: exception.stack,
        },
      });
    }

    if (exception instanceof HttpException) {
      response.status(exception.getStatus());

      const httpError: IPageProps = {
        title,
        error: {
          message: exception.message,
        },
      };

      if (isApiPage) {
        response.json(httpError);

        return;
      }

      if (isApi) {
        response.json(httpError.error);

        return;
      }

      response.render('_500', httpError);

      return;
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR);

    const unknownErrorResponse: IPageProps = {
      title,
      error: {
        message: 'Неизвестная ошибка',
      },
    };

    if (isApiPage) {
      response.json(unknownErrorResponse);

      return;
    }

    if (isApi) {
      response.json(unknownErrorResponse.error);

      return;
    }

    response.render('_500', unknownErrorResponse);
  }
}
