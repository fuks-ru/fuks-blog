import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ErrorCode } from 'auth-backend/SystemError/dto/SystemError';
import { SystemErrorFactory } from 'auth-backend/SystemError/services/SystemErrorFactory';

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

    if (envValue) {
      return envValue;
    }

    throw this.systemErrorFactory.create(
      ErrorCode.CONFIG_NOT_FOUND,
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
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return 3_003;
  }

  /**
   * True, если сервер запущен в dev-режиме.
   */
  public isDev(): boolean {
    return this.getEnv('NODE_ENV') === 'development';
  }

  /**
   * Возвращает конфиг для подключения к БД.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.isDev() ? 'localhost' : 'fuks-blog-auth-postgres',
      port: 5_432,
      synchronize: this.isDev(),
      database: 'auth',
      username: this.isDev()
        ? 'postgres'
        : this.getEnv('FUKS_BLOG_AUTH_POSTGRES_USER'),
      password: this.isDev()
        ? 'root'
        : this.getEnv('FUKS_BLOG_AUTH_POSTGRES_PASSWORD'),
      entities: ['**/entities/**/*.ts'],
      migrationsTableName: 'migration',
      migrations: ['src/__migration__/*.ts'],
      autoLoadEntities: true,
    };
  }

  /**
   * Получает jwt секрет.
   */
  public getJwtSecret(): string {
    return this.isDev()
      ? 'dev-jwt-secret'
      : this.getEnv('FUKS_BLOG_AUTH_JWT_SECRET');
  }

  /**
   * Получает clientId для Google-авторизации.
   */
  public getGoogleClientId(): string {
    return '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com';
  }
}
