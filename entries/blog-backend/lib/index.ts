import OpenAPIClientAxios, { Document } from 'openapi-client-axios';

import type { Client } from 'blog-backend-lib/client';
import schema from 'blog-backend-lib/swagger-schema.json';

/**
 * Получает api-контракт для работы с blog-backend.
 */
export const getApi = (baseUrl = '/'): Promise<Client> => {
  const api = new OpenAPIClientAxios({
    definition: schema as Document,
    axiosConfigDefaults: {
      baseURL: baseUrl,
    },
  });

  return api.init<Client>();
};

/**
 * Описание схема клиента.
 */
export type { Client } from 'blog-backend-lib/client';
