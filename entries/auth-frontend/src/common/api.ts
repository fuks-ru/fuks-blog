import {
  authApi,
  OperationMethods,
  TApiBody,
  TApiArgs,
  TApiResponse,
  OperationResponse,
} from '@difuks/api-auth-backend/dist/frontend';
import { UnknownError, ValidationError } from '@difuks/common/dist/frontend';
import { Form, FormInstance, message } from 'antd';
import { useCallback, useState } from 'react';

/**
 * Статус завершения запроса.
 */
export type TStatus = 'pending' | 'success' | 'failed' | 'none';

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

  const onFinish = useCallback(
    async (body: Body, args?: TApiArgs<ApiName>) => {
      setStatus('pending');

      try {
        await (
          authApi[name] as (
            args: unknown,
            body: Body,
          ) => OperationResponse<TApiResponse<ApiName>>
        )(args || null, body);

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
    [name, form],
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

  const method = useCallback(
    async (body: Body, args?: TApiArgs<ApiName>) => {
      setStatus('pending');

      try {
        const apiResponse = await (
          authApi[name] as (
            args: unknown,
            body: Body,
          ) => OperationResponse<TApiResponse<ApiName>>
        )(args || null, body);

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
    [name],
  );

  return [method, responseBody, status];
};
