import { SystemErrorFactory, ConfigGetterBase } from '@difuks/common';
import { ports } from '@difuks/common/dist/constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'node:path';
import process from 'node:process';

import { ErrorCode } from 'blog-backend/Config/enums/ErrorCode';

@Injectable()
export class ConfigGetter extends ConfigGetterBase {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  protected readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.CATEGORY_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCode.JWT_TOKEN_EMPTY]: HttpStatus.FORBIDDEN,
  };

  public constructor(systemErrorFactory: SystemErrorFactory) {
    super(systemErrorFactory);
  }

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
    return this.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  private getProdTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: 'fuks-blog-backend-postgres',
      port: 5_432,
      synchronize: false,
      database: 'blog',
      username: this.getEnv('FUKS_BLOG_BACKEND_POSTGRES_USER'),
      password: this.getEnv('FUKS_BLOG_BACKEND_POSTGRES_PASSWORD'),
      entities: ['**/entities/**/*.ts'],
      migrationsTableName: 'migration',
      migrations: ['src/__migration__/*.ts'],
      autoLoadEntities: true,
    };
  }

  private getDevTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: path.join(process.cwd(), './var/fuks-blog-backend-sqlite'),
      synchronize: true,
      entities: ['**/entities/**/*.ts'],
      autoLoadEntities: true,
    };
  }
}
