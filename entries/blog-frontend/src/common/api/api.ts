import axios, { AxiosInstance } from 'axios';

import { FULL_HOST } from 'blog-frontend/common/utils/constants';

class Api {
  private readonly axiosInstance!: AxiosInstance;

  public constructor() {
    this.axiosInstance = axios.create({
      baseURL: FULL_HOST,
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
