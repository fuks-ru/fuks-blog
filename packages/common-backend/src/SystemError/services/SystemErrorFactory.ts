import { Injectable } from '@nestjs/common';

import { SystemError } from 'common-backend/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  /**
   * Создает ошибку для приложения.
   */
  public create<Data = unknown>(
    code: string | number,
    message: string,
    data?: Data,
  ): SystemError<Data> {
    return new SystemError(code, message, data);
  }
}
