import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ConfirmEmailPage } from 'auth-frontend/pages/ConfirmEmail/ConfirmEmailPage';
import {
  RedirectFromContext,
  useRedirectFrom,
} from 'auth-frontend/hooks/useRedirectFrom';
import { RegisterPage } from 'auth-frontend/pages/Register/RegisterPage';
import { LoginPage } from 'auth-frontend/pages/Login/LoginPage';

/**
 * Главный компонент авторизации.
 */
export const App: FC = () => {
  const redirectFrom = useRedirectFrom();

  return (
    <RedirectFromContext.Provider value={redirectFrom}>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/confirm-email' element={<ConfirmEmailPage />} />
      </Routes>
    </RedirectFromContext.Provider>
  );
};
