import {
  ArgumentsHost,
  ExceptionFilter,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { CookieResponseSetter } from 'common/backend/CookieSetter/services/CookieResponseSetter';
import {
  IRedirectData,
  RedirectError,
} from 'common/backend/Redirect/dto/RedirectError';
import { CONFIG } from 'common/constants';
import { ConfigGetterBase } from 'common/backend/Config/services/ConfigGetterBase';
import { IErrorResponse } from 'common/backend/ErrorFilter/dto/IErrorResponse';
import { Logger } from 'common/backend/Logger/services/Logger';
import { SystemError } from 'common/backend/SystemError/dto/SystemError';
import { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';

@Injectable()
export class ErrorFilter implements ExceptionFilter<Error> {
  public constructor(
    private readonly logger: Logger,
    @Inject(CONFIG)
    private readonly configGetter: ConfigGetterBase,
    private readonly cookieResponseSetter: CookieResponseSetter,
  ) {}

  /**
   * Обрабатывает все ошибки приложения.
   */
  public catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.cookieResponseSetter.set(response);

    if (!request.url.includes('_next')) {
      this.logger.error('Произошла ошибка', {
        extra: {
          error: exception,
          stack: exception.stack,
        },
      });
    }

    const options = this.configGetter.getErrorFilterConfig();

    const isApi = request.url.includes(options.apiPrefix);

    if (exception instanceof RedirectError && !isApi) {
      response.status(HttpStatus.FOUND).redirect(exception.data.location);

      return;
    }

    const { errorResponse, status } = this.getResponseData(exception);

    response.status(status);

    if (isApi || !options.errorPageName) {
      response.json(errorResponse);

      return;
    }

    response.render(options.errorPageName, errorResponse);
  }

  private getResponseData(exception: Error): {
    /**
     * Ошибка в response.
     */
    errorResponse: IErrorResponse;
    /**
     * Статус ответа.
     */
    status: HttpStatus;
  } {
    if (exception instanceof SystemError) {
      return {
        errorResponse: this.formatResponse(
          exception.code,
          exception.message,
          exception.data,
        ),
        status: this.resolveStatus(exception.code),
      };
    }

    if (exception instanceof UnauthorizedException) {
      return {
        errorResponse: this.formatResponse(
          CommonErrorCode.UNAUTHORIZED,
          'Неверный логин или пароль.',
        ),
        status: this.resolveStatus(CommonErrorCode.UNAUTHORIZED),
      };
    }

    if (exception instanceof NotFoundException) {
      return {
        errorResponse: this.formatResponse(
          CommonErrorCode.NOT_FOUND_ROUTE,
          exception.message,
        ),
        status: this.resolveStatus(CommonErrorCode.NOT_FOUND_ROUTE),
      };
    }

    if (exception instanceof RedirectError) {
      return {
        errorResponse: this.formatResponse(
          CommonErrorCode.REDIRECT,
          exception.message,
          undefined,
          exception.data,
        ),
        status: this.resolveStatus(CommonErrorCode.REDIRECT),
      };
    }

    return {
      errorResponse: this.formatResponse(
        CommonErrorCode.UNKNOWN,
        exception.message,
      ),
      status: this.resolveStatus(CommonErrorCode.UNKNOWN),
    };
  }

  private resolveStatus(code: number | string): HttpStatus {
    const options = this.configGetter.getErrorFilterConfig();

    return options.statusResolver[code] || HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private formatResponse<Data>(
    code: number | string,
    message: string,
    data?: Data,
    redirect?: IRedirectData,
  ): IErrorResponse<Data> {
    return {
      code,
      message,
      data,
      redirect,
    };
  }
}
