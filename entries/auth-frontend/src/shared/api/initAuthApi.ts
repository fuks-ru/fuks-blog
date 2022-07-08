import {
  Client,
  getApi,
  OperationMethods,
  TApiArgs,
  TApiBody,
  TApiResponse,
} from '@difuks/auth-backend';
import { urls } from '@difuks/common/dist/constants';
import { errorInterceptor } from '@difuks/common/dist/frontend';
import { AxiosRequestConfig } from 'axios';
import { OperationResponse } from 'openapi-client-axios';

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
 * Получает конкретный api метод.
 */
export const getApiMethod = <
  ApiName extends keyof OperationMethods,
  ApiMethod extends (
    args: TApiArgs<ApiName> | null,
    body: TApiBody<ApiName>,
    config?: AxiosRequestConfig,
  ) => OperationResponse<TApiResponse<ApiName>>,
>(
  name: ApiName,
): ApiMethod => authApi[name].bind(authApi) as ApiMethod;
