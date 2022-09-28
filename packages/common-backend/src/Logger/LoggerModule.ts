import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import requestContext from 'request-context';

import { LoggerMiddleware } from 'common-backend/Logger/middlewares/LoggerMiddleware';
import { WinstonOptionsFactory } from 'common-backend/Logger/services/WinstonOptionsFactory';
import { Logger } from 'common-backend/Logger/services/Logger';
import { REQUEST_CONTEXT_ID } from 'common-backend/Logger/utils/constants';
import {
  ILoggerModuleAsyncOptions,
  ILoggerModuleOptions,
} from 'common-backend/Logger/types/ILoggerModuleOptions';

@Module({})
export class LoggerModule implements NestModule {
  /**
   * Регистрирует модуль.
   */
  public static forRoot(options: ILoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      global: true,
      imports: [
        WinstonModule.forRootAsync({
          inject: [WinstonOptionsFactory],
          useFactory: (optionsFactory: WinstonOptionsFactory) =>
            optionsFactory.create(options),
        }),
      ],
      providers: [
        Logger,
        WinstonOptionsFactory,
        {
          provide: 'LOGGER_MODULE_OPTIONS',
          useValue: options,
        },
      ],
      exports: [Logger, WinstonOptionsFactory],
    };
  }

  /**
   * Регистрирует модуль асинхронно.
   */
  public static forRootAsync(
    options: ILoggerModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: LoggerModule,
      global: true,
      imports: [
        WinstonModule.forRootAsync({
          imports: options.imports || [],
          inject: [WinstonOptionsFactory, ...(options.inject || [])],
          useFactory: async (
            optionsFactory: WinstonOptionsFactory,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: any[]
          ) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const result = await options.useFactory(...args);

            return optionsFactory.create(result);
          },
        }),
      ],
      providers: [
        Logger,
        WinstonOptionsFactory,
        {
          provide: 'LOGGER_MODULE_OPTIONS',
          inject: options.inject,
          useFactory: options.useFactory,
        },
      ],
      exports: [Logger, WinstonOptionsFactory],
    };
  }

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
