import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import qs from 'qs';

import { I18nResolver } from 'common/backend/I18n/services/I18nResolver';
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
    private readonly i18nResolver: I18nResolver,
  ) {}

  /**
   * Интерцептор для api-клиентов для взаимодействия с другим сервисом.
   */
  public async interceptor(
    error: AxiosError<IErrorResponse> | Error,
  ): Promise<never> {
    const i18n = await this.i18nResolver.resolve();

    if (!('response' in error) || !error.response) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.REMOTE_HOST_ERROR,
        i18n.t('remoteHostError'),
        error.message,
      );
    }

    const { data } = error.response;

    if (data.code === CommonErrorCode.VALIDATION) {
      throw await this.validationErrorFactory.createFromData(
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
      i18n.t('remoteHostError'),
      data.data,
    );
  }
}
