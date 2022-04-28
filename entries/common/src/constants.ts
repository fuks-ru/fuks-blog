/**
 * Токен для подключения сервиса с конфигом.
 */
export const CONFIG = 'common-config';

const prodDomainUrl = 'new.fuks.ru';

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
  AUTH_BACKEND_URL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${ports.AUTH_BACKEND_PORT}`
      : `https://auth.${prodDomainUrl}`,

  AUTH_FRONTEND_URL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${ports.AUTH_FRONTEND_PORT}`
      : `https://auth.${prodDomainUrl}`,

  BLOG_BACKEND_URL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${ports.BLOG_BACKEND_PORT}`
      : `https://backend.${prodDomainUrl}`,

  BLOG_FRONTEND_URL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${ports.BLOG_FRONTEND_PORT}`
      : `https://${prodDomainUrl}`,

  ADMIN_FRONTEND_URL:
    process.env.NODE_ENV === 'development'
      ? `http://localhost:${ports.ADMIN_FRONTEND_PORT}`
      : `https://admin.${prodDomainUrl}`,
};
