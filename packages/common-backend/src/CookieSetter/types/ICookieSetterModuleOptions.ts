import {
  InjectionToken,
  ModuleMetadata,
  OptionalFactoryDependency,
} from '@nestjs/common';

/**
 * Описывает конфиг модуля установки кук.
 */
export interface ICookieSetterModuleOptions {
  /**
   * Корневой домен.
   */
  domain: string;
}

/**
 * Описывает асинхронный модуля обработки ошибок.
 */
export interface ICookieSetterModuleAsyncOptions
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
  ) => Promise<ICookieSetterModuleOptions> | ICookieSetterModuleOptions;
}
