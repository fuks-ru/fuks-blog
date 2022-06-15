import { Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import qs from 'qs';

import { IRedirectData } from 'common/backend/Redirect/dto/RedirectError';
import { RequestRefService } from 'common/backend/RequestRef/services/RequestRefService';
import { ValidationErrorFactory } from 'common/backend/Validation/services/ValidationErrorFactory';
import { API_PAGE_PREFIX, urls } from 'common/constants';
import { IErrorResponse } from 'common/backend/ErrorFilter/dto/IErrorResponse';
import { RedirectErrorFactory } from 'common/backend/Redirect/services/RedirectErrorFactory';
import { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';
import { SystemErrorFactory } from 'common/backend/SystemError/services/SystemErrorFactory';

@Injectable()
export class ApiErrorsService {
  public constructor(
    private readonly redirectErrorFactory: RedirectErrorFactory,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly validationErrorFactory: ValidationErrorFactory,
    private readonly requestRefService: RequestRefService,
  ) {}

  /**
   * Интерцептор для api-клиентов для взаимодейтсвия с другим сервисом.
   */
  public interceptor(error: AxiosError<IErrorResponse> | Error): never {
    if (!('response' in error)) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.REMOTE_HOST_ERROR,
        'Произошла ошибка на удаленном хосте.',
        error.message,
      );
    }

    const { data } = error.response as AxiosResponse<IErrorResponse>;

    if (data.code === CommonErrorCode.VALIDATION) {
      throw this.validationErrorFactory.createFromData(
        data.data as Record<string, string[]>,
      );
    }

    if (data.code === CommonErrorCode.REDIRECT) {
      throw this.redirectErrorFactory.create(data.redirect as IRedirectData);
    }

    if (data.code === CommonErrorCode.FORBIDDEN) {
      const request = this.requestRefService.getRequest();

      const redirectFrom = `//${
        request.get('host') || urls.BLOG_FRONTEND_URL
      }${request.url.replace(API_PAGE_PREFIX, '')}`;

      throw this.redirectErrorFactory.create({
        location: `${urls.AUTH_FRONTEND_URL}?${qs.stringify({
          redirectFrom,
        })}`,
      });
    }

    throw this.systemErrorFactory.create(
      CommonErrorCode.REMOTE_HOST_ERROR,
      'Произошла ошибка на удаленном хосте.',
      data.data,
    );
  }
}
