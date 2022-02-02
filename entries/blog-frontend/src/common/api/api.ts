import OpenApiClientAxios from 'openapi-client-axios';

import { Client } from './ApiSchema';

class Api {
  private readonly openApi!: OpenApiClientAxios;

  public constructor() {
    this.openApi = new OpenApiClientAxios({
      definition: `${process.env.SERVER_FULL_HOST}/api-json`,
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
