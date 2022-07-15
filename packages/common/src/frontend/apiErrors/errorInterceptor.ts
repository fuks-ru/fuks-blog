import type { AxiosError } from 'axios';
import qs from 'qs';

import { urls } from 'common/constants';
import { UnknownError } from 'common/frontend/apiErrors/UnknownError';
import { ValidationError } from 'common/frontend/apiErrors/ValidationError';
import { IErrorResponse } from 'common/backend/ErrorFilter/dto/IErrorResponse';
import { IRedirectData } from 'common/backend/Redirect/dto/RedirectError';
import { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';

/**
 * Добавляет интерцептор для работы с api.
 */
export const errorInterceptor = (error: AxiosError<IErrorResponse>): void => {
  const { response } = error;

  if (!response) {
    throw new UnknownError('Empty response from Backend.');
  }

  if (response.data.code === CommonErrorCode.VALIDATION) {
    const data = response.data.data as Record<string, string[]>;

    throw new ValidationError(data, response.data.message);
  }

  if (response.data.code === CommonErrorCode.REDIRECT) {
    const data = response.data.redirect as IRedirectData;

    window.location.assign(data.location);

    return;
  }

  if (response.data.code === CommonErrorCode.UNAUTHORIZED) {
    window.location.assign(
      `${urls.AUTH_FRONTEND_URL}?${qs.stringify({
        redirectFrom: window.location.href,
      })}`,
    );

    return;
  }

  throw new UnknownError(response.data.message);
};
