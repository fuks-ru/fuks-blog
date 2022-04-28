import { HttpStatus } from '@nestjs/common';

import { urls } from 'common/constants';
import { IAuthModuleOptions } from 'common/modules/Config/types/IAuthModuleOptions';
import { IBlogBackendModuleOptions } from 'common/modules/Config/types/IBlogBackendModuleOptions';
import { IErrorFilterModuleOptions } from 'common/modules/ErrorFilter/types/IErrorFilterModuleOptions';
import { ILoggerModuleOptions } from 'common/modules/Logger/types/ILoggerModuleOptions';
import { CommonErrorCode } from 'common/modules/SystemError/enums/CommonErrorCode';
import { SystemErrorFactory } from 'common/modules/SystemError/services/SystemErrorFactory';

export abstract class ConfigGetterBase {
  protected abstract readonly statusResolver: Record<string, HttpStatus>;

  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  /**
   * Получает config-параметр из env файла.
   *
   * @throws HttpException. В случае отсутствия конфига.
   */
  public getEnv(name: string): string {
    const envValue = process.env[name];

    if (envValue) {
      return envValue;
    }

    throw this.systemErrorFactory.create(
      CommonErrorCode.CONFIG_NOT_FOUND,
      `Не найден ${name} конфиг параметр`,
    );
  }

  /**
   * Получает префикс маршрута для апи.
   */
  public getApiPrefix(): string {
    return '/api';
  }

  /**
   * Получает настройки для модуля обработки ошибок.
   */
  public getErrorFilterConfig(): IErrorFilterModuleOptions {
    return {
      apiPrefix: this.getApiPrefix(),
      statusResolver: {
        [CommonErrorCode.NOT_FOUND_ROUTE]: HttpStatus.NOT_FOUND,
        [CommonErrorCode.FORBIDDEN]: HttpStatus.FORBIDDEN,
        [CommonErrorCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
        [CommonErrorCode.VALIDATION]: HttpStatus.UNPROCESSABLE_ENTITY,
        ...this.statusResolver,
      },
    };
  }

  /**
   * Получает порт для апи.
   */
  public abstract getApiPort(): number;

  /**
   * True, если сервер запущен в dev-режиме.
   */
  public isDev(): boolean {
    return this.getEnv('NODE_ENV') === 'development';
  }

  /**
   * Возвращает конфиг для запросов к auth-backend.
   */
  public getAuthConfig(): IAuthModuleOptions {
    return {
      authBackendUrl: urls.AUTH_BACKEND_URL,
      authFrontendUrl: urls.AUTH_FRONTEND_URL,
    };
  }

  /**
   * Возвращает конфиг для запросов к blog-backend.
   */
  public getBlogBackendConfig(): IBlogBackendModuleOptions {
    return {
      blogBackendUrl: urls.BLOG_BACKEND_URL,
    };
  }

  /**
   * Получает конфиг для модуля с системными ошибками.
   */
  public getLoggerConfig(): ILoggerModuleOptions {
    return {
      isToConsoleDisable: false,
      isToFileDisable: this.isDev(),
    };
  }
}
