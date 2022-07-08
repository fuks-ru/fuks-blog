import { FC, ReactNode } from 'react';
import { Link as LinkBase, useLocation } from 'react-router-dom';

import { routes } from 'auth-frontend/shared/config/routes';

interface IProps {
  route: keyof typeof routes;
  children: ReactNode;
  saveQuery?: boolean;
}

/**
 * Компонент ссылки внутри приложения. Умеет сохранять query-параметры.
 */
export const Link: FC<IProps> = ({ children, route, saveQuery = true }) => {
  const { search } = useLocation();

  const to = `${routes[route]}${saveQuery ? search : ''}`;

  return <LinkBase to={to}>{children}</LinkBase>;
};
