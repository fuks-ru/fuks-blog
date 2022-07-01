import {
  getApi,
  OperationMethods,
  TApiBody,
  TApiArgs,
  TApiResponse,
  Client,
} from '@difuks/auth-backend';
import { urls } from '@difuks/common/dist/constants';
import {
  errorInterceptor,
  UnknownError,
  ValidationError,
} from '@difuks/common/dist/frontend';
import { Form, FormInstance, message } from 'antd';
import { AxiosRequestConfig } from 'axios';
import { OperationResponse } from 'openapi-client-axios';
import { useCallback, useState } from 'react';

import { useExecuteRecaptcha } from 'auth-frontend/components/GoogleRecaptcha/hooks/useExecuteRecaptcha';

/**
 * Статус завершения запроса.
 */
export type TStatus = 'pending' | 'success' | 'failed' | 'none';

/**
 * Клиент для работы с AuthApi.
 */
// eslint-disable-next-line import/no-mutable-exports
export let authApi: Client;

/**
 * Инициализирует Api.
 */
export const initAuthApi = async (): Promise<void> => {
  authApi = await getApi(urls.AUTH_BACKEND_URL);

  authApi.interceptors.response.use(undefined, errorInterceptor);
  authApi.defaults.headers.common.i18next = navigator.language;
};

/**
 * Обертка над api-client сервиса авторизации, предоставляющая инстанс
 * antd-формы и callback onFinish.
 */
export const useAuthForm = <
  ApiName extends keyof OperationMethods,
  Body extends TApiBody<ApiName>,
>(
  name: ApiName,
): [
  FormInstance<Body>,
  (body: Body, args?: TApiArgs<ApiName>) => Promise<void>,
  TStatus,
] => {
  const [form] = Form.useForm<Body>();

  const [status, setStatus] = useState<TStatus>('none');
  const executeRecaptcha = useExecuteRecaptcha();

  const onFinish = useCallback(
    async (body: Body, args?: TApiArgs<ApiName>) => {
      setStatus('pending');

      try {
        const apiMethod = getApiMethod(name);
        const token = await executeRecaptcha();

        await apiMethod(args || null, body, {
          headers: {
            recaptcha: token,
          },
        });

        setStatus('success');
      } catch (error) {
        form.setFields(
          Object.keys(body as Record<string, unknown>).map((name) => ({
            name,
            errors: undefined,
          })),
        );

        if (error instanceof ValidationError) {
          const { data } = error;

          form.setFields(
            Object.entries(data).map(([name, errors]) => ({ name, errors })),
          );

          await message.error(error.message);

          setStatus('failed');

          return;
        }

        if (error instanceof UnknownError) {
          await message.error(error.message);

          setStatus('failed');

          return;
        }

        await message.error('Неизвестная ошибка');

        setStatus('failed');
      }
    },
    [name, executeRecaptcha, form],
  );

  return [form, onFinish, status];
};

/**
 * Получает метод, объект ответа и статус запроса из authApi.
 */
export const useAuthApi = <
  ApiName extends keyof OperationMethods,
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

        await message.error('Неизвестная ошибка');

        setStatus('failed');
      }
    },
    [executeRecaptcha, name],
  );

  return [method, responseBody, status];
};

const getApiMethod = <
  ApiName extends keyof OperationMethods,
  ApiMethod extends (
    args: TApiArgs<ApiName> | null,
    body: TApiBody<ApiName>,
    config?: AxiosRequestConfig,
  ) => OperationResponse<TApiResponse<ApiName>>,
>(
  name: ApiName,
): ApiMethod => authApi[name] as ApiMethod;
