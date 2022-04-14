import OpenAPIClientAxios, { Document } from 'openapi-client-axios';

import { Client } from 'blog-backend-lib/client';
import schema from 'blog-backend-lib/swagger-schema.json';

const api = new OpenAPIClientAxios({
  definition: schema as Document,
});

/**
 * Получает api-контракт для работы с blog-backend.
 */
export const getApi = (): Promise<Client> => api.init<Client>();

/**
 * Описание схема клиента.
 */
export type { Client } from 'blog-backend-lib/client';
