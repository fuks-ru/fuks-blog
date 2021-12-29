import OpenApiClientAxios from 'openapi-client-axios';

import { API_PREFIX } from '../utils/constants';
import { Client } from './ApiSchema';

class Api {
  private openApi!: OpenApiClientAxios;

  public constructor() {
    this.openApi = new OpenApiClientAxios({
      definition: `${process.env.SERVER_FULL_HOST}${API_PREFIX}-json`,
    });
  }

  public async getClient(): Promise<Client> {
    await this.init();

    return this.openApi.getClient();
  }

  private async init(): Promise<void> {
    await this.openApi.init();
  }
}

const api = new Api();

/**
 * Инстанс класса для всех http запросов на bff.
 *
 * Является оберткой над openapi-client-axios.
 */
export { api };
