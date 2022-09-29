import { FC } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { UsersPage } from 'admin/pages/UsersPage';
import { routes } from 'admin/shared/config/routes';
import { AppProvider } from 'admin/app/providers';

/**
 * Главный компонент админки.
 */
export const App: FC = () => (
  <AppProvider>
    <Route path={routes.users} element={<UsersPage />} />
  </AppProvider>
);
