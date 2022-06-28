import { Client, getApi } from '@difuks/blog-backend';
import {
  ApiErrorsService,
  IErrorResponse,
  RequestRefService,
} from '@difuks/common';
import { urls } from '@difuks/common/dist/constants';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';

@Injectable()
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
    const request = this.requestRefService.getRequest();

    this.client.defaults.headers.common.cookie = request.headers.cookie || '';

    return this.client;
  }

  private async init(): Promise<void> {
    this.client = await getApi(urls.BLOG_BACKEND_URL);

    this.client.interceptors.response.use(
      undefined,
      (error: AxiosError<IErrorResponse>) =>
        this.apiErrorsService.interceptor(error),
    );
  }
}
