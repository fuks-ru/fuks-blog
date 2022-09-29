import { EnvGetter } from '@fuks-ru/common-backend';
import { API_PREFIX, domainUrl, ports } from '@fuks-ru/fuks-blog-constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { I18nTranslation } from 'nestjs-i18n';
import path from 'node:path';
import process from 'node:process';

import { ormConfig } from 'backend/Config/utils/ormconfig';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class ConfigGetter {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  public readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.CATEGORY_NOT_FOUND]: HttpStatus.NOT_FOUND,
  };

  public constructor(private readonly envGetter: EnvGetter) {}

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return ports.BLOG_BACKEND_PORT;
  }

  /**
   * Возвращает конфиг для подключения к БД.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.envGetter.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  /**
   * Получает префикс API.
   */
  public getApiPrefix(): string {
    return API_PREFIX;
  }

  /**
   * Получает lang-фразы.
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
    return {
      'ru-RU': {},
      'en-US': {},
    };
  }

  /**
   * Получает корневой домен.
   */
  public getDomain(): string {
    return domainUrl;
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
      database: path.join(process.cwd(), './var/fuks-backend-sqlite'),
      synchronize: true,
      entities: ['**/entities/**/*.ts'],
      autoLoadEntities: true,
    };
  }
}
