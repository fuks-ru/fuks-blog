import { DynamicModule, Module } from '@nestjs/common';
import {
  CookieResolver,
  HeaderResolver,
  I18nModule as I18nModuleBase,
} from 'nestjs-i18n';

import { I18nValidationTranslator } from 'common-backend/I18n/services/I18nValidationTranslator';
import { I18nResolver } from 'common-backend/I18n/services/I18nResolver';
import { I18nLoader } from 'common-backend/I18n/services/I18nLoader';
import enUS from 'common-backend/__i18n__/enUS.json';
import ruRU from 'common-backend/__i18n__/ruRU.json';
import {
  II18nModuleAsyncOptions,
  II18nModuleOptions,
} from 'common-backend/I18n/types/II18nModuleOptions';

@Module({})
export class I18nModule {
  /**
   * Регистрирует модуль.
   */
  public static forRoot(options: II18nModuleOptions): DynamicModule {
    return {
      module: I18nModule,
      global: true,
      imports: [
        I18nModuleBase.forRoot({
          resolvers: [
            new CookieResolver(['i18next']),
            new HeaderResolver(['i18next']),
          ],
          loader: I18nLoader,
          fallbackLanguage: 'en-US',
          loaderOptions: {
            languages: ['en-US', 'ru-RU'],
            translations: {
              'en-US': { ...enUS, ...options.translations?.['en-US'] },
              'ru-RU': { ...ruRU, ...options.translations?.['ru-RU'] },
            },
          },
        }),
      ],
      providers: [I18nResolver, I18nValidationTranslator],
      exports: [I18nResolver, I18nValidationTranslator],
    };
  }

  /**
   * Регистрирует модуль асинхронно.
   */
  public static forRootAsync(options: II18nModuleAsyncOptions): DynamicModule {
    return {
      module: I18nModule,
      global: true,
      imports: [
        I18nModuleBase.forRootAsync({
          resolvers: [
            new CookieResolver(['i18next']),
            new HeaderResolver(['i18next']),
          ],
          loader: I18nLoader,
          imports: options.imports,
          inject: options.inject,
          useFactory: async (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...args: any[]
          ) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            const result = await options.useFactory(...args);

            return {
              fallbackLanguage: 'en-US',
              loaderOptions: {
                languages: ['en-US', 'ru-RU'],
                translations: {
                  'en-US': { ...enUS, ...result.translations?.['en-US'] },
                  'ru-RU': { ...ruRU, ...result.translations?.['ru-RU'] },
                },
              },
            };
          },
        }),
      ],
      providers: [I18nResolver, I18nValidationTranslator],
      exports: [I18nResolver, I18nValidationTranslator],
    };
  }
}
