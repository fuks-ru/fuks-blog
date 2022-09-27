import { IRedirectData } from 'common/errorResponse/IRedirectData';

/**
 * HTTP ответ при ошибке.
 */
export interface IErrorResponse<Data = unknown> {
  /**
   * Код ошибки.
   */
  code: number | string;

  /**
   * Сообщение об ошибке.
   */
  message: string;

  /**
   * Описывает данные для редиректа.
   */
  redirect?: IRedirectData;

  /**
   * Дополнительные данные (например, ошибки валидации).
   */
  data?: Data;
}
