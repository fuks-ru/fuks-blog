import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import requestContext from 'request-context';

import {
  REQUEST,
  REQUEST_CONTEXT_ID,
} from 'common-backend/RequestRef/utils/constants';

@Injectable()
export class RequestRefMiddleware implements NestMiddleware {
  /**
   * Добавляет в контекст request запроса. Стандартный декоратор Request не
   * используется, так как nest не позволяет использовать его не в
   * request-scoped провайдерах (стратегиях, глобальных error-фильтрах) .
   */
  public use(req: Request, res: Response, next: NextFunction): void {
    requestContext.set(`${REQUEST_CONTEXT_ID}:${REQUEST}`, req);

    next();
  }
}
