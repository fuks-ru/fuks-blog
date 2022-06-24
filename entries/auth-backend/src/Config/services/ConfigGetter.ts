import { SystemErrorFactory, ConfigGetterBase } from '@difuks/common';
import { ports } from '@difuks/common/dist/constants';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha';
import { Request } from 'express';
import * as path from 'node:path';
import * as process from 'node:process';

import { ormConfig } from 'auth-backend/Config/utils/ormconfig';
import { ErrorCode } from 'auth-backend/Config/enums/ErrorCode';

interface IRequest extends Request {
  headers: {
    recaptcha?: string;
  };
}

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
    [ErrorCode.CONFIRM_CODE_NOT_EXIST]: HttpStatus.NOT_FOUND,
    [ErrorCode.CONFIRM_CODE_TIMEOUT]: HttpStatus.TOO_MANY_REQUESTS,
    [ErrorCode.FORGOT_PASSWORD_NOT_EXIST]: HttpStatus.NOT_FOUND,
    [ErrorCode.FORGOT_PASSWORD_CODE_TIMEOUT]: HttpStatus.TOO_MANY_REQUESTS,
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
    return this.isDev()
      ? '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com'
      : this.getEnv('FUKS_BLOG_AUTH_GOOGLE_CLIENT_ID');
  }

  /**
   * Конфиг для отправки почты.
   */
  public getMailerTransport(): TransportType {
    return this.isDev()
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
          host: this.getEnv('MAILER_HOST'),
          port: 465,
          secure: true,
          auth: {
            user: this.getMailerFrom(),
            pass: this.getEnv('MAILER_PASSWORD'),
          },
        };
  }

  /**
   * Email для отправки почты.
   */
  public getMailerFrom(): string {
    return this.isDev() ? 'test@fuks.ru' : this.getEnv('MAILER_USER');
  }

  /**
   * Конфиг для Google Recaptcha.
   */
  public getRecaptchaOptions(): GoogleRecaptchaModuleOptions {
    return this.isDev()
      ? {
          secretKey: '6Lel8ZcgAAAAANztX82p5f1bqQocGi1aUw_YgjTn',
          response: (request: IRequest) => request.headers.recaptcha || '',
          score: 0.8,
        }
      : {
          secretKey: this.getEnv('GOOGLE_RECAPTCHA_SECRET_KEY'),
          response: (request: IRequest) => request.headers.recaptcha || '',
          score: 0.8,
        };
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
