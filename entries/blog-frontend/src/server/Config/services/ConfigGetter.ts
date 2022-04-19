import { Injectable } from '@nestjs/common';

import {
  API_PAGE_PREFIX,
  API_PREFIX,
} from 'blog-frontend/common/utils/constants';
import { SystemErrorFactory } from 'blog-frontend/server/SystemError/services/SystemErrorFactory';

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
