/**
 * Префикс API-запросов.
 */
export const API_PREFIX = '/api';

/**
 * Префикс API-запросов за состоянием страницы.
 */
export const API_PAGE_PREFIX = `${API_PREFIX}/page`;

const BFF_SCHEMA = process.env.BFF_SCHEMA || 'http';
const BFF_HOST = process.env.BFF_HOST || 'localhost';
const BFF_PORT = process.env.BFF_PORT || '3001';

/**
 * Полный адрес сервера.
 */
export const FULL_HOST = `${BFF_SCHEMA}://${BFF_HOST}:${BFF_PORT}`;
