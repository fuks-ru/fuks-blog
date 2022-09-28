import { urls } from '@fuks-ru/constants';
import axios, { AxiosInstance } from 'axios';

class Api {
  private readonly axiosInstance!: AxiosInstance;

  private readonly baseUrl = urls.BLOG_FRONTEND_URL;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
    });
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
