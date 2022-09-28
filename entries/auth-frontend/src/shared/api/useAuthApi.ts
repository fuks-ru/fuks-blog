import {
  TMethods,
  TApiArgs,
  TApiBody,
  TApiResponse,
} from '@fuks-ru/auth-backend';
import { UnknownError, ValidationError } from '@fuks-ru/common-frontend';
import { message } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useExecuteRecaptcha } from 'auth-frontend/shared/lib/useExecuteRecaptcha';
import { getApiMethod, TStatus } from 'auth-frontend/shared/api/initAuthApi';

/**
 * Получает метод, объект ответа и статус запроса из authApi.
 */
export const useAuthApi = <
  ApiName extends TMethods,
  Body extends TApiBody<ApiName>,
>(
  name: ApiName,
): [
  (body: Body, args?: TApiArgs<ApiName>) => Promise<void>,
  TApiResponse<ApiName> | undefined,
  TStatus,
] => {
  const [responseBody, setResponseBody] = useState<TApiResponse<ApiName>>();
  const [status, setStatus] = useState<TStatus>('none');
  const executeRecaptcha = useExecuteRecaptcha();
  const { t } = useTranslation();

  const method = useCallback(
    async (body: Body, args?: TApiArgs<ApiName>) => {
      setStatus('pending');

      try {
        const apiMethod = getApiMethod(name);

        const token = await executeRecaptcha();

        const apiResponse = await apiMethod(args || null, body, {
          headers: {
            recaptcha: token,
          },
        });

        setResponseBody(apiResponse.data);

        setStatus('success');

        return;
      } catch (error) {
        if (error instanceof ValidationError || error instanceof UnknownError) {
          await message.error(error.message);

          setStatus('failed');

          return;
        }

        await message.error(t('unknownError'));

        setStatus('failed');
      }
    },
    [executeRecaptcha, name, t],
  );

  return [method, responseBody, status];
};
