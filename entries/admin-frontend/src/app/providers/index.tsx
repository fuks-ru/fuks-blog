import { FC, ReactNode } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import { ReduxProvider } from 'admin-frontend/app/providers/ReduxProvider';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер всего приложения.
 */
export const AppProvider: FC<IProps> = ({ children }) => (
  <BrowserRouter>
    <ReduxProvider>
      <Routes>{children}</Routes>
    </ReduxProvider>
  </BrowserRouter>
);
