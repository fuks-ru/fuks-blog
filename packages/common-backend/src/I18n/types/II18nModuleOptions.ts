import { I18nTranslation } from 'nestjs-i18n';
import {
  InjectionToken,
  ModuleMetadata,
  OptionalFactoryDependency,
} from '@nestjs/common';

/**
 * Описывает конфиг модуля переводов.
 */
export interface II18nModuleOptions {
  /**
   * Переводы.
   */
  translations?: {
    'en-US'?: I18nTranslation;
    'ru-RU'?: I18nTranslation;
  };
}

/**
 * Описывает асинхронный конфиг модуля переводов.
 */
export interface II18nModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  /**
   * Сервисы для DI.
   */
  inject?: Array<InjectionToken | OptionalFactoryDependency>;
  /**
   * Функция, возвращающая конфиг.
   */
  useFactory: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...args: any[]
  ) => Promise<II18nModuleOptions> | II18nModuleOptions;
}
