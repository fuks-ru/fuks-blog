import { Spin } from 'antd';
import { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ConfirmEmailPage } from 'auth-frontend/pages/ConfirmEmail/ConfirmEmailPage';
import {
  RedirectFromContext,
  useRedirectFrom,
} from 'auth-frontend/hooks/useRedirectFrom';

const RegisterPage = lazy(
  () => import('auth-frontend/pages/Register/RegisterPage'),
);
const LoginPage = lazy(() => import('auth-frontend/pages/Login/LoginPage'));
const ForgotPasswordPage = lazy(
  () => import('auth-frontend/pages/ForgotPassword/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('auth-frontend/pages/ChangePassword/ChangePasswordPage'),
);

/**
 * Главный компонент авторизации.
 */
export const App: FC = () => {
  const redirectFrom = useRedirectFrom();

  return (
    // TODO нормально стилизовать спиннер
    <Suspense fallback={<Spin />}>
      <RedirectFromContext.Provider value={redirectFrom}>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/confirm-email' element={<ConfirmEmailPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/change-password' element={<ChangePasswordPage />} />
        </Routes>
      </RedirectFromContext.Provider>
    </Suspense>
  );
};
