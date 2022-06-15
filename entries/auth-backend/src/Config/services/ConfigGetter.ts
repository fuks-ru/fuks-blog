import { SystemErrorFactory, ConfigGetterBase } from '@difuks/common';
import { ports } from '@difuks/common/dist/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'node:path';
import * as process from 'node:process';

import { ormConfig } from 'auth-backend/Config/utils/ormconfig';
import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';

@Injectable()
export class ConfigGetter extends ConfigGetterBase {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  protected readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.GOOGLE_AUTH_EMAIL_NOT_FOUND]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.USER_ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [ErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
  };

  public constructor(systemErrorFactory: SystemErrorFactory) {
    super(systemErrorFactory);
  }

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return ports.AUTH_BACKEND_PORT;
  }

  /**
   * Возвращает конфиг для подключения к БД.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  /**
   * Получает jwt секрет.
   */
  public getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.isDev()
        ? 'dev-jwt-secret'
        : this.getEnv('FUKS_BLOG_AUTH_JWT_SECRET'),
    };
  }

  /**
   * Получает clientId для Google-авторизации.
   */
  public getGoogleClientId(): string {
    return '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com';
  }

  private getProdTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      ...ormConfig,
      autoLoadEntities: true,
    };
  }

  private getDevTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: path.join(process.cwd(), './var/fuks-blog-auth-sqlite'),
      synchronize: true,
      entities: ['**/entities/**/*.ts'],
      autoLoadEntities: true,
    };
  }
}
