import { IErrorResponse } from '@difuks/common/dist';
import { urls } from '@difuks/common/dist/constants';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { IS_SERVER } from 'blog-frontend/common/utils/constants';

class Api {
  private readonly axiosInstance!: AxiosInstance;

  private readonly baseUrl = urls.BLOG_FRONTEND_URL;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });

    this.axiosInstance.interceptors.response.use(
      undefined,
      (error: AxiosError<IErrorResponse>) => {
        const { data } = error.response as AxiosResponse<IErrorResponse>;

        if (!data.redirect) {
          throw error;
        }

        if (IS_SERVER) {
          throw error;
        }

        window.location.assign(data.redirect.location);
      },
    );
  }

  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

const api = new Api();

/**
 * Инстанс класса для всех http запросов на bff.
 */
export { api };
