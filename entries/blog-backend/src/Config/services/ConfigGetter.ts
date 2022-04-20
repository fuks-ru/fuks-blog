import { Injectable } from '@nestjs/common';

import { ErrorCode } from 'blog-backend/SystemError/dto/SystemError';
import { SystemErrorFactory } from 'blog-backend/SystemError/services/SystemErrorFactory';

@Injectable()
export class ConfigGetter {
  private readonly apiPrefix = '/blog-backend/api';

  private readonly apiPort = 3_001;

  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  /**
   * Получает config-параметр из env файла.
   *
   * @throws HttpException. В случае отсутствия конфига.
   */
  public getEnv(name: string): string {
    const envValue = process.env[name];

    if (!envValue) {
      throw this.systemErrorFactory.create(
        ErrorCode.CONFIG_NOT_FOUND,
        `Не найден ${name} конфиг параметр`,
      );
    }

    return envValue;
  }

  /**
   * Получает префикс маршрута для апи.
   */
  public getApiPrefix(): string {
    return this.apiPrefix;
  }

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return this.apiPort;
  }

  /**
   * True, если сервер запущен в dev-режиме.
   */
  public isDev(): boolean {
    return this.getEnv('NODE_ENV') !== 'production';
  }
}
