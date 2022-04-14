import { Injectable } from '@nestjs/common';

import { SystemErrorFactory } from 'blog-backend/SystemError/services/SystemErrorFactory';

/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';

/**
 * Префикс API-запросов за состоянием страницы.
 */
export const API_PAGE_PREFIX = `${API_PREFIX}/page`;

@Injectable()
export class ConfigGetter {
  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  /**
   * Получает config-параметр из env файла.
   *
   * @throws HttpException. В случае отсутствия конфига.
   */
  public getEnv(name: string): string {
    const envValue = process.env[name];

    if (!envValue) {
      throw this.systemErrorFactory.create(`Не найден ${name} конфиг параметр`);
    }

    return envValue;
  }

  /**
   * Получает полный адрес сервера.
   */
  public getFullHost(): string {
    return `${this.getEnv('SERVER_SCHEMA')}://${this.getEnv(
      'SERVER_HOST',
    )}:${this.getEnv('SERVER_PORT')}`;
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
}
