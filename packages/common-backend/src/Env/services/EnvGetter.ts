import { CommonErrorCode } from '@fuks-ru/common';

import { SystemErrorFactory } from 'common-backend/SystemError/services/SystemErrorFactory';

export class EnvGetter {
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
      `Env parameter "${name}" not found`,
    );
  }

  /**
   * True, если сервер запущен в dev-режиме.
   */
  public isDev(): boolean {
    return this.getEnv('NODE_ENV') === 'development';
  }
}
