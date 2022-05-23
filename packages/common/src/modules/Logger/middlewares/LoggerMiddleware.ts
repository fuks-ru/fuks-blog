import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import requestContext from 'request-context';
import { lookup } from 'geoip-lite';

import {
  REQUEST_CONTEXT_ID,
  REQUEST_ID_KEY,
  REQUEST_SESSION_ID_KEY,
} from 'common/modules/Logger/utils/constants';
import { Logger } from 'common/modules/Logger/services/Logger';

interface ICookie {
  sessionId: string;
}

interface IRequest extends Omit<Request, 'cookies'> {
  cookies?: ICookie;
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
  public use(req: IRequest, res: Response, next: NextFunction): void {
    requestContext.set(`${REQUEST_CONTEXT_ID}:${REQUEST_ID_KEY}`, v4());

    const sessionId = req.cookies?.sessionId || v4();

    res.cookie('sessionId', sessionId);

    requestContext.set(
      `${REQUEST_CONTEXT_ID}:${REQUEST_SESSION_ID_KEY}`,
      sessionId,
    );

    const geo = lookup(req.ip);

    this.logger.info('Новый входящий запрос', {
      extra: {
        url: req.url,
        method: req.method,
        query: req.query,
        body: req.body as unknown,
        ip: req.ip,
        city: geo?.city,
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
