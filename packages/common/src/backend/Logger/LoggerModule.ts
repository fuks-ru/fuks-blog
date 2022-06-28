import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import requestContext from 'request-context';

import { LoggerMiddleware } from 'common/backend/Logger/middlewares/LoggerMiddleware';
import { WinstonOptionsFactory } from 'common/backend/Logger/services/WinstonOptionsFactory';
import { Logger } from 'common/backend/Logger/services/Logger';
import { REQUEST_CONTEXT_ID } from 'common/backend/Logger/utils/constants';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [WinstonOptionsFactory],
      useFactory: (optionsFactory: WinstonOptionsFactory) =>
        optionsFactory.create(),
    }),
  ],
  providers: [Logger, WinstonOptionsFactory],
  exports: [Logger, WinstonOptionsFactory],
})
export class LoggerModule implements NestModule {
  /**
   * Конфигурация для модуля. Подключает middleware для создания контекста
   * запроса, логирования запросов и ответов. Исключает все _next маршруты.
   */
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(requestContext.middleware(REQUEST_CONTEXT_ID))
      .forRoutes('*')
      .apply(LoggerMiddleware)
      .exclude('/_next/(.*)')
      .forRoutes('*');
  }
}
