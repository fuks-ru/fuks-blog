import type { AxiosError } from 'axios';
import {
  IErrorResponse,
  IRedirectData,
  CommonErrorCode,
} from '@fuks-ru/common';

import { ValidationError } from 'common-frontend/apiErrors/ValidationError';
import { UnknownError } from 'common-frontend/apiErrors/UnknownError';
import { UnauthorizedError } from 'common-frontend/apiErrors/UnauthorizedError';

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
    throw new UnauthorizedError();
  }

  throw new UnknownError(response.data.message);
};
