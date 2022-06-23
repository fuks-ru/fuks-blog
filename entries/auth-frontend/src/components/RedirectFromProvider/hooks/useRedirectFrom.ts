import { createContext, useContext } from 'react';

/**
 * Контекст, хранящий url для редиректа после успешного логина.
 */
export const RedirectFromContext = createContext('');

/**
 * Хук, получающий контекст, хранящий url для редиректа.
 */
export const useRedirectFrom = (): string => useContext(RedirectFromContext);
