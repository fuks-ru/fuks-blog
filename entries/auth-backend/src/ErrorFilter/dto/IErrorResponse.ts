import { ErrorCode } from 'auth-backend/SystemError/dto/SystemError';

/**
 * HTTP ответ при ошибке.
 */
export interface IErrorResponse {
  /**
   * Код ошибки.
   */
  code: ErrorCode;

  /**
   * Сообщение об ошибке.
   */
  message: string;
}
