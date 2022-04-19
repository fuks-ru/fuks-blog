import OpenAPIClientAxios, {
  Document,
  OperationResponse,
} from 'openapi-client-axios';

import {
  Client,
  defaultBaseUrl,
  OperationMethods,
} from 'blog-backend-lib/client';
import schema from 'blog-backend-lib/swagger-schema.json';

/**
 * Получает api-контракт для работы с blog-backend.
 */
export const getApi = (baseURL = defaultBaseUrl): Promise<Client> => {
  const api = new OpenAPIClientAxios({
    definition: schema as Document,
    axiosConfigDefaults: {
      baseURL,
    },
  });

  return api.init<Client>();
};

/**
 * Описания типа возвращаемого с бэка значения.
 */
export type TApiResponse<Method extends keyof OperationMethods> = ReturnType<
  OperationMethods[Method]
> extends OperationResponse<infer Response>
  ? Response
  : never;

/**
 * Описание схема клиента.
 */
export type {
  Client,
  OperationMethods,
  PathsDictionary,
} from 'blog-backend-lib/client';
