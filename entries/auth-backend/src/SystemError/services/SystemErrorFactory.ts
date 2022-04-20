import { Injectable } from '@nestjs/common';

import {
  ErrorCode,
  SystemError,
} from 'auth-backend/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  /**
   * Создает ошибку для приложения.
   */
  public create(code: ErrorCode, message: string): SystemError {
    return new SystemError(code, message);
  }
}
