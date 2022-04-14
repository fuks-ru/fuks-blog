import { HttpStatus } from '@nestjs/common';

/**
 * Коды системных ошибок.
 */
export enum ErrorCode {
  CONFIG_NOT_FOUND = 100,
  OTHER = 1_000,
  UNKNOWN = 1_001,
}

export class SystemError extends Error {
  /**
   * HTTP статус ответа.
   */
  public readonly httpStatus: HttpStatus;

  private readonly statusResolver = {
    [ErrorCode.OTHER]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ErrorCode.UNKNOWN]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ErrorCode.CONFIG_NOT_FOUND]: HttpStatus.INTERNAL_SERVER_ERROR,
  };

  public constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
  ) {
    super(message);
    this.httpStatus = this.statusResolver[code];
  }
}
