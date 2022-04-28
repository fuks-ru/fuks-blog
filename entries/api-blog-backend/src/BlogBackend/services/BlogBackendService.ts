import { Client, getApi } from '@difuks/blog-backend/dist/lib';
import {
  CommonErrorCode,
  CONFIG,
  ConfigGetterBase,
  IErrorResponse,
  RedirectErrorFactory,
  SystemErrorFactory,
} from '@difuks/common';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';

@Injectable()
export class BlogBackendService {
  private client!: Client;

  public constructor(
    private readonly redirectErrorFactory: RedirectErrorFactory,
    private readonly systemErrorFactory: SystemErrorFactory,
    @Inject(CONFIG)
    private readonly configGetter: ConfigGetterBase,
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
    const blogBackendConfig = this.configGetter.getBlogBackendConfig();
    const authConfig = this.configGetter.getAuthConfig();

    this.client = await getApi(blogBackendConfig.blogBackendUrl);

    this.client.interceptors.response.use(
      undefined,
      (error: AxiosError<IErrorResponse>) => {
        const { data } = error.response as AxiosResponse<IErrorResponse>;

        if (data.code === CommonErrorCode.FORBIDDEN) {
          throw this.redirectErrorFactory.create({
            location: authConfig.authFrontendUrl,
          });
        }

        throw this.systemErrorFactory.create(
          CommonErrorCode.BLOG_BACKEND_ERROR,
          'Произошла ошибка на основном бэкенде',
          data.data,
        );
      },
    );
  }
}
