import { urls } from '@difuks/common/dist/constants';
import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Контекст, хранящий url для редиректа после успешного логина.
 */
export const RedirectFromContext = createContext('');

/**
 * Хук, получающий значение url для редиректа из query-параметров.
 */
export const useRedirectFrom = (): string => {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => searchParams.get('redirectFrom') || urls.BLOG_FRONTEND_URL,
    [searchParams],
  );
};

/**
 * Хук, получающий контекст, хранящий url для редиректа.
 */
export const useRedirectFromContext = (): string =>
  useContext(RedirectFromContext);
