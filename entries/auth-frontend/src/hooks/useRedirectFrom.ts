import { urls } from '@difuks/common/dist/constants';
import { createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const RedirectFromContext = createContext('');

export const useRedirectFrom = (): string => {
  const [searchParams] = useSearchParams();

  return useMemo(
    () => searchParams.get('redirectFrom') || urls.BLOG_FRONTEND_URL,
    [searchParams],
  );
};

export const useRedirectFromContext = (): string =>
  useContext(RedirectFromContext);
