import { Client, getApi } from '@difuks/blog-backend';
import {
  RequestRefService,
  I18nResolver,
  RedirectErrorFactory,
  SystemErrorFactory,
} from '@difuks/common-backend';
import { urls } from '@difuks/constants';
import { CommonErrorCode, IErrorResponse } from '@difuks/common';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import qs from 'qs';

import { API_PAGE_PREFIX } from 'blog-frontend/shared/lib/constants';

@Injectable()
export class BlogBackendService {
  private clientInstance!: Client;

  public constructor(
    private readonly requestRefService: RequestRefService,
    private readonly i18nResolver: I18nResolver,
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly redirectErrorFactory: RedirectErrorFactory,
  ) {
    void this.init();
  }

  /**
   * Получить клиента.
   */
  public get client(): Client {
    const request = this.requestRefService.getRequest();

    this.clientInstance.defaults.headers.common.cookie =
      request.headers.cookie || '';

    return this.clientInstance;
  }

  private async init(): Promise<void> {
    this.clientInstance = await getApi(urls.BLOG_BACKEND_URL);

    this.clientInstance.interceptors.response.use(
      undefined,
      async (error: AxiosError<IErrorResponse>) => {
        const i18n = await this.i18nResolver.resolve();

        if (!('response' in error) || !error.response) {
          throw this.systemErrorFactory.create(
            CommonErrorCode.REMOTE_HOST_ERROR,
            i18n.t('remoteHostError'),
            error.message,
          );
        }

        const { data } = error.response;

        if (data.code === CommonErrorCode.UNAUTHORIZED) {
          const request = this.requestRefService.getRequest();

          const redirectFrom = `//${
            request.get('host') || urls.BLOG_FRONTEND_URL
          }${request.url.replace(API_PAGE_PREFIX, '')}`;

          throw this.redirectErrorFactory.create({
            location: `${urls.AUTH_FRONTEND_URL}?${qs.stringify({
              redirectFrom,
            })}`,
          });
        }

        throw this.systemErrorFactory.create(
          data.code,
          data.message,
          data.data,
        );
      },
    );
  }
}
