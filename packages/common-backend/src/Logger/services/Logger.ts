import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';
import requestContext from 'request-context';

import {
  REQUEST_CONTEXT_ID,
  REQUEST_ID_KEY,
  REQUEST_SESSION_ID_KEY,
} from 'common-backend/Logger/utils/constants';
import { LoggerLevel } from 'common-backend/Logger/enums/LoggerLevel';

/**
 * Опции логгера.
 */
interface ILoggerOptions {
  /**
   * Дополнительная информация.
   */
  extra?: unknown;
}

/**
 * Сообщения логгера.
 */
interface ILoggerMessage {
  /**
   * Id запроса.
   */
  requestId: string;
  /**
   * Id сессии.
   */
  sessionId: string;
  /**
   * Текст сообщения.
   */
  message: string;
  /**
   * Дополнительные данные.
   */
  extra?: unknown;
}

/**
 * Контекст запроса.
 */
interface IRequestContext {
  /**
   * Id запроса.
   */
  [REQUEST_ID_KEY]: string;
  /**
   * Id сессии.
   */
  [REQUEST_SESSION_ID_KEY]: string;
}

@Injectable()
export class Logger {
  public constructor(
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly winstonLogger: WinstonLogger,
  ) {}

  /**
   * Логи уровня error.
   */
  public error(message: string, options?: ILoggerOptions): void {
    this.log(LoggerLevel.ERROR, message, options);
  }

  /**
   * Логи уровня info.
   */
  public info(message: string, options?: ILoggerOptions): void {
    this.log(LoggerLevel.INFO, message, options);
  }

  private log(
    level: LoggerLevel,
    message: string,
    options?: ILoggerOptions,
  ): void {
    const context = requestContext.get<IRequestContext>(REQUEST_CONTEXT_ID);

    const loggerMessage: ILoggerMessage = {
      message,
      extra: options?.extra,
      requestId: context[REQUEST_ID_KEY],
      sessionId: context[REQUEST_SESSION_ID_KEY],
    };

    this.winstonLogger.log(level, JSON.stringify(loggerMessage));
  }
}
