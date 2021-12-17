import { Injectable } from '@nestjs/common';

import { SystemErrorFactory } from '@server/SystemError/services/SystemErrorFactory';

import ProcessEnv = NodeJS.ProcessEnv;

@Injectable()
export class ConfigGetter {
  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  /**
   * Получает config-параметр из env файла.
   *
   * @throws HttpException. В случае отсутствия конфига.
   */
  public get(name: keyof ProcessEnv): string {
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
    return `${this.get('SERVER_SCHEMA')}://${this.get(
      'SERVER_HOST',
    )}:${this.get('SERVER_PORT')}`;
  }
}
