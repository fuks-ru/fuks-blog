import { getApi, Client } from '@difuks/auth-backend';

import { AUTH_BACKEND_URL } from 'auth-frontend/common/constants';

/**
 * Клиент для работы с AuthApi.
 */
// eslint-disable-next-line import/no-mutable-exports
export let authApi: Client;

/**
 * Инициализирует Api.
 */
export const initAuthApi = async (): Promise<void> => {
  authApi = await getApi(AUTH_BACKEND_URL);
};
