import {
  getApi,
  Client,
  TApiArgs,
  TApiBody,
  OperationMethods,
} from '@difuks/auth-backend';
import { urls } from '@difuks/common/dist/constants';
import {
  errorInterceptor,
  UnknownError,
  ValidationError,
} from '@difuks/common/dist/frontend';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { message } from 'antd';

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

interface IQueryArgs {
  method: keyof OperationMethods;
  params?: TApiArgs<keyof OperationMethods>;
  body?: TApiBody<keyof OperationMethods>;
}

/**
 * Возвращает функцию для генерации базового query rtk.
 */
export const authBaseQuery = (): BaseQueryFn<IQueryArgs> => async (args) => {
  const method = authApi[args.method].bind(authApi);

  try {
    const response = await method(args.params, args.body);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ValidationError || error instanceof UnknownError) {
      await message.error(error.message);

      return {
        error: error.message,
      };
    }

    await message.error('Unknown error');

    return {
      error: 'Unknown error',
    };
  }
};
