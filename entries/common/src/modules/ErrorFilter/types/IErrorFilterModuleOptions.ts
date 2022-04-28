import { HttpStatus } from '@nestjs/common';

/**
 * Описывает конфиг модуля обработки ошибок.
 */
export interface IErrorFilterModuleOptions {
  /**
   * Префикс api-маршрутов.
   */
  apiPrefix: string;
  /**
   * Страница, отображаемая в случае ошибки.
   */
  errorPageName?: string;
  /**
   * Маппер, определяющий соответствие между кодами ошибок и http статусами.
   */
  statusResolver: Record<string | number, HttpStatus>;
}
