import { DynamicModule, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ErrorFilter } from 'common-backend/ErrorFilter/filters/ErrorFilter';
import {
  IErrorFilterModuleAsyncOptions,
  IErrorFilterModuleOptions,
} from 'common-backend/ErrorFilter/types/IErrorFilterModuleOptions';

@Module({})
export class ErrorFilterModule {
  /**
   * Регистрирует модуль.
   */
  public static forRoot(options: IErrorFilterModuleOptions): DynamicModule {
    return {
      module: ErrorFilterModule,
      providers: [
        {
          provide: APP_FILTER,
          useClass: ErrorFilter,
        },
        {
          provide: 'ERROR_MODULE_OPTIONS',
          useValue: options,
        },
      ],
    };
  }

  /**
   * Регистрирует модуль асинхронно.
   */
  public static forRootAsync(
    options: IErrorFilterModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: ErrorFilterModule,
      imports: options.imports,
      providers: [
        {
          provide: APP_FILTER,
          useClass: ErrorFilter,
        },
        {
          provide: 'ERROR_MODULE_OPTIONS',
          inject: options.inject,
          useFactory: options.useFactory,
        },
      ],
    };
  }
}
