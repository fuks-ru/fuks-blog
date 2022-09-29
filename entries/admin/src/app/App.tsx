import { FC } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { UsersPage } from 'admin-frontend/pages/UsersPage';
import { routes } from 'admin-frontend/shared/config/routes';
import { AppProvider } from 'admin-frontend/app/providers';

/**
 * Главный компонент админки.
 */
export const App: FC = () => (
  <AppProvider>
    <Route path={routes.users} element={<UsersPage />} />
  </AppProvider>
);
