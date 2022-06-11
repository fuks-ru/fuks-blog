import { Client, getApi } from '@difuks/blog-backend';
import {
  ApiErrorsService,
  IErrorResponse,
  RequestRefService,
} from '@difuks/common';
import { urls } from '@difuks/common/dist/constants';
import { Injectable, Scope } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable({ scope: Scope.REQUEST })
export class BlogBackendService {
  private client!: Client;

  public constructor(
    private readonly apiErrorsService: ApiErrorsService,
    private readonly requestRefService: RequestRefService,
  ) {
    void this.init();
  }

  /**
   * Получить клиента.
   */
  public getClient(): Client {
    return this.client;
  }

  private async init(): Promise<void> {
    this.client = await getApi(urls.BLOG_BACKEND_URL);

    const request = this.requestRefService.getRequest();

    this.client.defaults.headers.common.cookie = request.headers.cookie || '';

    this.client.interceptors.response.use(
      undefined,
      (error: AxiosError<IErrorResponse>) =>
        this.apiErrorsService.interceptor(error),
    );
  }
}
