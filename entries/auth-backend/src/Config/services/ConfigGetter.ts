import { EnvGetter, ICommonModuleOptions } from '@difuks/common-backend';
import { API_PREFIX, ports, domainUrl } from '@difuks/constants';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';
import { Request } from 'express';
import * as path from 'node:path';
import * as process from 'node:process';
import { I18nTranslation } from 'nestjs-i18n';

import { ormConfig } from 'auth-backend/Config/utils/ormconfig';
import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';
import enUs from 'auth-backend/__i18n__/enUS.json';
import ruRU from 'auth-backend/__i18n__/ruRU.json';

interface IRequest extends Request {
  headers: {
    recaptcha?: string;
  };
}

@Injectable()
export class ConfigGetter {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  public readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.GOOGLE_AUTH_EMAIL_NOT_FOUND]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.USER_ALREADY_EXISTS]: HttpStatus.CONFLICT,
    [ErrorCode.USER_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCode.CONFIRM_CODE_NOT_EXIST]: HttpStatus.NOT_FOUND,
    [ErrorCode.CONFIRM_CODE_TIMEOUT]: HttpStatus.TOO_MANY_REQUESTS,
    [ErrorCode.FORGOT_PASSWORD_NOT_EXIST]: HttpStatus.NOT_FOUND,
    [ErrorCode.FORGOT_PASSWORD_CODE_TIMEOUT]: HttpStatus.TOO_MANY_REQUESTS,
    [ErrorCode.UNAUTHORIZED]: HttpStatus.UNAUTHORIZED,
  };

  public constructor(private readonly envGetter: EnvGetter) {}

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return ports.AUTH_BACKEND_PORT;
  }

  /**
   * Получает префикс API.
   */
  public getApiPrefix(): string {
    return API_PREFIX;
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
   * Получает jwt секрет.
   */
  public getJwtConfig(): JwtModuleOptions {
    return {
      secret: this.envGetter.isDev()
        ? 'dev-jwt-secret'
        : this.envGetter.getEnv('FUKS_BLOG_AUTH_JWT_SECRET'),
    };
  }

  /**
   * Получает clientId для Google-авторизации.
   */
  public getGoogleClientId(): string {
    return this.envGetter.isDev()
      ? '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com'
      : this.envGetter.getEnv('FUKS_BLOG_AUTH_GOOGLE_CLIENT_ID');
  }

  /**
   * Конфиг для отправки почты.
   */
  public getMailerTransport(): TransportType {
    return this.envGetter.isDev()
      ? {
          host: 'mail.fuks.ru',
          port: 465,
          secure: true,
          auth: {
            user: this.getMailerFrom(),
            pass: 'test-mailer',
          },
        }
      : {
          host: this.envGetter.getEnv('MAILER_HOST'),
          port: 465,
          secure: true,
          auth: {
            user: this.getMailerFrom(),
            pass: this.envGetter.getEnv('MAILER_PASSWORD'),
          },
        };
  }

  /**
   * Email для отправки почты.
   */
  public getMailerFrom(): string {
    return this.envGetter.isDev()
      ? 'test@fuks.ru'
      : this.envGetter.getEnv('MAILER_USER');
  }

  /**
   * Конфиг для Google Recaptcha.
   */
  public getRecaptchaOptions(): GoogleRecaptchaModuleOptions {
    return this.envGetter.isDev()
      ? {
          secretKey: '6Lel8ZcgAAAAANztX82p5f1bqQocGi1aUw_YgjTn',
          response: (request: IRequest) => request.headers.recaptcha || '',
          score: 0.8,
        }
      : {
          secretKey: this.envGetter.getEnv('GOOGLE_RECAPTCHA_SECRET_KEY'),
          response: (request: IRequest) => request.headers.recaptcha || '',
          score: 0.8,
        };
  }

  /**
   * Возвращает переводы.
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
      'en-US': enUs,
      'ru-RU': ruRU,
    };
  }

  /**
   * Получает конфиг для логгера.
   */
  public getLoggerOptions(): ICommonModuleOptions['logger'] {
    return {
      isToConsoleDisable: false,
      isToFileDisable: false,
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
      database: path.join(process.cwd(), './var/fuks-blog-auth-sqlite'),
      synchronize: true,
      entities: ['**/entities/**/*.ts'],
      autoLoadEntities: true,
    };
  }
}
