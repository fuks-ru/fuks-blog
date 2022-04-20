/**
 * Адрес основного бэкенда.
 */
export const BLOG_BACKEND_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/';

/**
 * Адрес бэкенда для авторизации.
 */
export const AUTH_BACKEND_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3003' : '/';
