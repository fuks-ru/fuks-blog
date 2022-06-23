import { urls } from '@difuks/common/dist/constants';
import { FC, ReactNode, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { RedirectFromContext } from 'auth-frontend/components/RedirectFromProvider/hooks/useRedirectFrom';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер, предоставляющий контекст для получения query-параметра redirectFrom.
 */
export const RedirectFromProvider: FC<IProps> = ({ children }) => {
  const [searchParams] = useSearchParams();

  const redirectFrom = useMemo(
    () => searchParams.get('redirectFrom') || urls.BLOG_FRONTEND_URL,
    [searchParams],
  );

  return (
    <RedirectFromContext.Provider value={redirectFrom}>
      {children}
    </RedirectFromContext.Provider>
  );
};
