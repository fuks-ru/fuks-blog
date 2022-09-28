/**
 * Описывает конфиг модуля логирования.
 */ import {
  InjectionToken,
  ModuleMetadata,
  OptionalFactoryDependency,
} from '@nestjs/common';

/**
 * Описывает конфиг модуля логирования.
 */
export interface ILoggerModuleOptions {
  /**
   * Отключает логирование в консоль.
   */
  isToConsoleDisable?: boolean;
  /**
   * Отключает логирование в файл.
   */
  isToFileDisable?: boolean;
  /**
   * Корневой домен для установки кук сессии.
   */
  domain: string;
}
/**
 * Описывает асинхронный конфиг модуля логирования.
 */
export interface ILoggerModuleAsyncOptions
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
  ) => Promise<ILoggerModuleOptions> | ILoggerModuleOptions;
}
