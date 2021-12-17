import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import requestContext from 'request-context';

import { Logger } from '@server/Logger/services/Logger';
import {
  REQUEST_CONTEXT_ID,
  REQUEST_ID_KEY,
  REQUEST_SESSION_ID_KEY,
} from '@server/Logger/utils/constants';

interface ICookie {
  sessionId: string;
}

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public constructor(private readonly logger: Logger) {}

  /**
   * Логирует входящие и исходящие запросы.
   *
   * Устанавливает уникальный request id для запроса и куку для уникальной
   * сессии. С целью объединения нескольких логов в рамках одного запроса и сессии.
   */
  public use(req: Request, res: Response, next: NextFunction): void {
    requestContext.set(`${REQUEST_CONTEXT_ID}:${REQUEST_ID_KEY}`, v4());

    const sessionId = (req.cookies as ICookie).sessionId || v4();

    res.cookie('sessionId', sessionId);

    requestContext.set(
      `${REQUEST_CONTEXT_ID}:${REQUEST_SESSION_ID_KEY}`,
      sessionId,
    );

    this.logger.info('Новый входящий запрос', {
      extra: {
        url: req.url,
        method: req.method,
        query: req.query,
        body: req.body,
      },
    });

    res.on('finish', () => {
      this.logger.info('Совершен ответ от сервера', {
        extra: {
          url: req.url,
          statusCode: res.statusCode,
        },
      });
    });

    next();
  }
}
