import OpenApiClientAxios from 'openapi-client-axios';

import { Client } from '@common/api/ApiSchema';
import { API_PREFIX } from '@common/utils/constants';

class Api {
  private openApi!: OpenApiClientAxios;

  public constructor() {
    this.openApi = new OpenApiClientAxios({
      definition: `${process.env.SERVER_FULL_HOST}${API_PREFIX}-json`,
    });
  }

  public async init(): Promise<void> {
    await this.openApi.init();
  }

  public getClient(): Promise<Client> {
    return this.openApi.getClient();
  }
}

const api = new Api();

void api.init();

/**
 * Инстанс класса для всех http запросов на bff.
 *
 * Является оберткой над openapi-client-axios.
 */
export { api };
