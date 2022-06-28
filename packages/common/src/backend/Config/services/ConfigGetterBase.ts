import { HttpStatus } from '@nestjs/common';
import { I18nTranslation } from 'nestjs-i18n';

import { API_PAGE_PREFIX, API_PREFIX } from 'common/constants';
import { IErrorFilterModuleOptions } from 'common/backend/ErrorFilter/types/IErrorFilterModuleOptions';
import { ILoggerModuleOptions } from 'common/backend/Logger/types/ILoggerModuleOptions';
import { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';
import { SystemErrorFactory } from 'common/backend/SystemError/services/SystemErrorFactory';

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
      `Config parameter "${name}" not found`,
    );
  }

  /**
   * Получает префикс маршрута для апи.
   */
  public getApiPrefix(): string {
    return API_PREFIX;
  }

  /**
   * Получает префикс маршрута для апи страницы.
   */
  public getApiPagePrefix(): string {
    return API_PAGE_PREFIX;
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
   * Получает конфиг для модуля с системными ошибками.
   */
  public getLoggerConfig(): ILoggerModuleOptions {
    return {
      isToConsoleDisable: false,
      isToFileDisable: this.isDev(),
    };
  }

  /**
   * Получает дополнительные lang-фразы.
   */
  public getTranslations(): {
    /**
     * Английские переводы.
     */
    'en-US': I18nTranslation;
    /**
     * Русские переводы.
     */
    'ru-RU': I18nTranslation;
  } {
    return { 'en-US': {}, 'ru-RU': {} };
  }
}
