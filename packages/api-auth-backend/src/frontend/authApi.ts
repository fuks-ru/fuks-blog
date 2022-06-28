import { getApi, Client } from '@difuks/auth-backend';
import { urls } from '@difuks/common/dist/constants';
import { errorInterceptor } from '@difuks/common/dist/frontend/apiErrors/errorInterceptor';
import { UnknownError } from '@difuks/common/dist/frontend/apiErrors/UnknownError';
import { ValidationError } from '@difuks/common/dist/frontend/apiErrors/ValidationError';

/**
 * Клиент для работы с AuthApi.
 */
// eslint-disable-next-line import/no-mutable-exports
export let authApi: Client;

/**
 * Инициализирует Api.
 */
export const initAuthApi = async (
  customErrorInterceptor?: (error: UnknownError | ValidationError) => void,
): Promise<void> => {
  authApi = await getApi(urls.AUTH_BACKEND_URL);

  authApi.interceptors.response.use(undefined, errorInterceptor);
  authApi.defaults.headers.common.i18next = navigator.language;

  if (customErrorInterceptor) {
    authApi.interceptors.response.use(undefined, customErrorInterceptor);
  }
};
