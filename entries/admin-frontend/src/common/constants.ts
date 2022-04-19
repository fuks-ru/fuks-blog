/**
 * Адрес основного бэкенда.
 */
export const BLOG_BACKEND_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : '/';
