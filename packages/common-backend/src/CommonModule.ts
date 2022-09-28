import {
  DynamicModule,
  HttpStatus,
  InjectionToken,
  Module,
  ModuleMetadata,
  OptionalFactoryDependency,
} from '@nestjs/common';
import { I18nTranslation } from 'nestjs-i18n';

import { CookieSetterModule } from 'common-backend/CookieSetter/CookieSetterModule';
import { ErrorFilterModule } from 'common-backend/ErrorFilter/ErrorFilterModule';
import { I18nModule } from 'common-backend/I18n/I18nModule';
import { LoggerModule } from 'common-backend/Logger/LoggerModule';
import { RedirectModule } from 'common-backend/Redirect/RedirectModule';
import { RequestRefModule } from 'common-backend/RequestRef/RequestRefModule';
import { SwaggerModule } from 'common-backend/Swagger/SwaggerModule';
import { SystemErrorModule } from 'common-backend/SystemError/SystemErrorModule';
import { ValidationModule } from 'common-backend/Validation/ValidationModule';
import { ILoggerModuleOptions } from 'common-backend/Logger/types/ILoggerModuleOptions';
import { EnvModule } from 'common-backend/Env/EnvModule';

/**
 * Настройки основного модуля.
 */
export interface ICommonModuleOptions {
  /**
   * Маппер, определяющий соответствие между кодами ошибок и http статусами.
   */
  statusResolver?: Record<string, HttpStatus>;
  /**
   * Переводы.
   */
  translations?: {
    'en-US'?: I18nTranslation;
    'ru-RU'?: I18nTranslation;
  };
  /**
   * Страница, отображаемая в случае ошибки.
   */
  errorPageName?: string;
  /**
   * Настройки логгера.
   */
  logger?: Omit<ILoggerModuleOptions, 'domain'>;
  /**
   * Корневой домен для кук.
   */
  domain: string;
  /**
   * Префикс для api.
   */
  apiPrefix: string;
}

interface ICommonModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<ICommonModuleOptions> | ICommonModuleOptions;
}

@Module({})
export class CommonModule {
  private static readonly commonModules = [
    RedirectModule,
    RequestRefModule,
    SwaggerModule,
    SystemErrorModule,
    ValidationModule,
    EnvModule,
  ];

  /**
   * Регистрирует основной модуль.
   */
  public static forRoot(options: ICommonModuleOptions): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      imports: [
        ErrorFilterModule.forRoot({
          statusResolver: options.statusResolver || {},
          errorPageName: options.errorPageName,
          apiPrefix: options.apiPrefix,
        }),
        I18nModule.forRoot({
          translations: options.translations,
        }),
        LoggerModule.forRoot({
          ...options.logger,
          domain: options.domain,
        }),
        CookieSetterModule.forRoot({
          domain: options.domain,
        }),
        ...CommonModule.commonModules,
      ],
    };
  }

  /**
   * Регистрирует основной модуль асинхронно.
   */
  public static forRootAsync(
    options: ICommonModuleAsyncOptions,
  ): DynamicModule {
    return {
      module: CommonModule,
      global: true,
      imports: [
        ErrorFilterModule.forRootAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args: unknown[]) => {
            const result = await options.useFactory(...args);

            return {
              errorPageName: result.errorPageName,
              statusResolver: result.statusResolver || {},
              apiPrefix: result.apiPrefix,
            };
          },
        }),
        I18nModule.forRootAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args: unknown[]) => {
            const result = await options.useFactory(...args);

            return {
              translations: result.translations,
            };
          },
        }),
        LoggerModule.forRootAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args: unknown[]) => {
            const result = await options.useFactory(...args);

            return {
              ...result.logger,
              domain: result.domain,
            };
          },
        }),
        CookieSetterModule.forRootAsync({
          imports: options.imports,
          inject: options.inject,
          useFactory: async (...args: unknown[]) => {
            const result = await options.useFactory(...args);

            return {
              domain: result.domain,
            };
          },
        }),
        ...CommonModule.commonModules,
      ],
    };
  }
}
