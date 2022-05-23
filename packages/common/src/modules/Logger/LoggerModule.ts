import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import requestContext from 'request-context';

import { WinstonOptionsModule } from 'common/modules/Logger/modules/WinstonOptions/WinstonOptionsModule';
import { LoggerMiddleware } from 'common/modules/Logger/middlewares/LoggerMiddleware';
import { WinstonOptionsFactory } from 'common/modules/Logger/modules/WinstonOptions/services/WinstonOptionsFactory';
import { Logger } from 'common/modules/Logger/services/Logger';
import { REQUEST_CONTEXT_ID } from 'common/modules/Logger/utils/constants';

@Global()
@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [WinstonOptionsModule],
      inject: [WinstonOptionsFactory],
      useFactory: (optionsFactory: WinstonOptionsFactory) =>
        optionsFactory.create(),
    }),
  ],
  providers: [Logger],
  exports: [Logger],
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