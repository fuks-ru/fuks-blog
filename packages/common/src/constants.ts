/**
 * Токен для подключения сервиса с конфигом.
 */
export const CONFIG = 'common-config';

const prodDomainUrl = 'new.fuks.ru';

/**
 * Находимся ли мы в dev режиме.
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Порты всех сервисов.
 */
export const ports = {
  BLOG_FRONTEND_PORT: 3_000,
  BLOG_BACKEND_PORT: 3_001,
  AUTH_FRONTEND_PORT: 3_002,
  AUTH_BACKEND_PORT: 3_003,
  ADMIN_FRONTEND_PORT: 3_004,
};

/**
 * Маршруты ко всем сервисам.
 */
export const urls = {
  AUTH_BACKEND_URL: isDevelopment
    ? `http://localhost:${ports.AUTH_BACKEND_PORT}`
    : `https://auth.${prodDomainUrl}`,

  AUTH_FRONTEND_URL: isDevelopment
    ? `http://localhost:${ports.AUTH_FRONTEND_PORT}`
    : `https://auth.${prodDomainUrl}`,

  BLOG_BACKEND_URL: isDevelopment
    ? `http://localhost:${ports.BLOG_BACKEND_PORT}`
    : `https://backend.${prodDomainUrl}`,

  BLOG_FRONTEND_URL: isDevelopment
    ? `http://localhost:${ports.BLOG_FRONTEND_PORT}`
    : `https://${prodDomainUrl}`,

  ADMIN_FRONTEND_URL: isDevelopment
    ? `http://localhost:${ports.ADMIN_FRONTEND_PORT}`
    : `https://admin.${prodDomainUrl}`,
};

/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';

/**
 * Префикс API-запросов за состоянием страницы.
 */
export const API_PAGE_PREFIX = `${API_PREFIX}/page`;
