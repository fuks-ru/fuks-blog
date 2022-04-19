import axios, { AxiosInstance } from 'axios';

import { BFF_PORT } from 'blog-frontend/common/utils/constants';

class Api {
  private readonly axiosInstance!: AxiosInstance;

  private readonly baseUrl = `http://localhost:${BFF_PORT}/`;

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
