/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';

/**
 * Префикс API-запросов за состоянием страницы.
 */
export const API_PAGE_PREFIX = `${API_PREFIX}/page`;

/**
 * Если true, то мы в режиме ssr.
 */
export const IS_SERVER = typeof window === 'undefined';
