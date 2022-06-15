import {
  authApi,
  initAuthApi,
  OperationMethods,
  TApiBody,
} from '@difuks/api-auth-backend/dist/frontend';
import { UnknownError, ValidationError } from '@difuks/common/dist/frontend';
import { Form, FormInstance, message } from 'antd';
import { useCallback } from 'react';

/**
 * Обертка над api-client сервиса авторизации, предоставляющая инстанс
 * antd-формы и callback onFinish.
 */
export const useAuthForm = <
  ApiName extends keyof OperationMethods,
  Body extends TApiBody<ApiName>,
>(
  name: ApiName,
): [FormInstance<Body>, (body: Body) => Promise<void>] => {
  const [form] = Form.useForm<Body>();

  const onFinish = useCallback(
    async (body: Body) => {
      try {
        await (
          authApi[name] as (args: unknown, body: Body) => Promise<unknown>
        )(null, body);
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
        }
      }
    },
    [name, form],
  );

  return [form, onFinish];
};

/**
 * Инициализирует api-client сервиса авторизации.
 */
export const initApi = async (): Promise<void> => {
  await initAuthApi((error) => {
    if (error instanceof UnknownError) {
      void message.error(error.message);
    }

    throw error;
  });
};
