import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SystemErrorFactory {
  /**
   * Создает ошибку для приложения.
   */
  public create(
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ): HttpException {
    return new HttpException(message, status);
  }
}
