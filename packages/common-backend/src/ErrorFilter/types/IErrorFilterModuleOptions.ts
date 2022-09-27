import {
  HttpStatus,
  InjectionToken,
  ModuleMetadata,
  OptionalFactoryDependency,
} from '@nestjs/common';

/**
 * Описывает конфиг модуля обработки ошибок.
 */
export interface IErrorFilterModuleOptions {
  /**
   * Страница, отображаемая в случае ошибки.
   */
  errorPageName?: string;
  /**
   * Маппер, определяющий соответствие между кодами ошибок и http статусами.
   */
  statusResolver: Record<string | number, HttpStatus>;
  /**
   * Префикс для api-запросов.
   */
  apiPrefix: string;
}

/**
 * Описывает асинхронный модуля обработки ошибок.
 */
export interface IErrorFilterModuleAsyncOptions
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
  ) => Promise<IErrorFilterModuleOptions> | IErrorFilterModuleOptions;
}
