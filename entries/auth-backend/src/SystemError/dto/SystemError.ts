import { HttpStatus } from '@nestjs/common';

/**
 * Коды системных ошибок.
 */
export enum ErrorCode {
  CONFIG_NOT_FOUND = 100,
  GOOGLE_AUTH_PAYLOAD_EMPTY = 200,
  GOOGLE_AUTH_EMAIL_NOT_FOUND = 201,
  BASIC_AUTH_INCORRECT_EMAIL_OR_PASSWORD = 301,
  UNKNOWN = 1_001,
}

export class SystemError extends Error {
  /**
   * HTTP статус ответа.
   */
  public readonly httpStatus: HttpStatus;

  private readonly statusResolver = {
    [ErrorCode.UNKNOWN]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ErrorCode.CONFIG_NOT_FOUND]: HttpStatus.INTERNAL_SERVER_ERROR,
    [ErrorCode.GOOGLE_AUTH_PAYLOAD_EMPTY]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.GOOGLE_AUTH_EMAIL_NOT_FOUND]: HttpStatus.UNAUTHORIZED,
    [ErrorCode.BASIC_AUTH_INCORRECT_EMAIL_OR_PASSWORD]: HttpStatus.UNAUTHORIZED,
  };

  public constructor(
    public readonly code: ErrorCode,
    public readonly message: string,
  ) {
    super(message);
    this.httpStatus = this.statusResolver[code];
  }
}
