import { getApi, Client } from '@difuks/blog-backend';
import { urls } from '@difuks/common/dist/constants';
import {
  errorInterceptor,
  UnknownError,
  ValidationError,
} from '@difuks/common/dist/frontend';

/**
 * Клиент для работы с BlogApi.
 */
// eslint-disable-next-line import/no-mutable-exports
export let blogApi: Client;

/**
 * Инициализирует Api.
 */
export const initBlogApi = async (
  customErrorInterceptor?: (error: UnknownError | ValidationError) => void,
): Promise<void> => {
  blogApi = await getApi(urls.BLOG_BACKEND_URL);

  blogApi.interceptors.response.use(undefined, errorInterceptor);

  if (customErrorInterceptor) {
    blogApi.interceptors.response.use(undefined, customErrorInterceptor);
  }
};
