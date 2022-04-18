import { Client, getApi } from '@difuks/blog-backend';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreBackendService {
  private client!: Client;

  /**
   * Инициализировать клиента.
   */
  public async init(): Promise<void> {
    this.client = await getApi();
  }

  /**
   * Получить клиента.
   */
  public getClient(): Client {
    return this.client;
  }
}
