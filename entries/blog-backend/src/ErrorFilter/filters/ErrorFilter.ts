import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import type { IPageProps } from '@fuks/blog-frontend/src/common/types/page/IPageProps';

import { ConfigGetter } from '@blog-backend/Config/services/ConfigGetter';
import { Logger } from '@blog-backend/Logger/services/Logger';

@Injectable()
export class ErrorFilter implements ExceptionFilter {
  public constructor(
    private readonly logger: Logger,
    private readonly configGetter: ConfigGetter,
  ) {}

  /**
   * Обрабатывает все ошибки приложения.
   */
  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isApi = request.url.includes(this.configGetter.getApiPrefix());
    const isApiPage = request.url.includes(
      this.configGetter.getApiPagePrefix(),
    );

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
