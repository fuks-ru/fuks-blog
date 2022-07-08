import { FC, lazy } from 'react';
import { Route } from 'react-router-dom';

import { AppProvider } from 'auth-frontend/app/providers';
import { routes } from 'auth-frontend/shared/config/routes';
import { ConfirmEmailPage } from 'auth-frontend/pages/ConfirmEmailPage';

const RegisterPage = lazy(() => import('auth-frontend/pages/RegisterPage'));
const LoginPage = lazy(() => import('auth-frontend/pages/LoginPage'));
const ForgotPasswordPage = lazy(
  () => import('auth-frontend/pages/ForgotPasswordPage'),
);
const ChangePasswordPage = lazy(
  () => import('auth-frontend/pages/ChangePasswordPage'),
);

/**
 * Главный компонент авторизации.
 */
export const App: FC = () => (
  <AppProvider>
    <Route path={routes.login} element={<LoginPage />} />
    <Route path={routes.registration} element={<RegisterPage />} />
    <Route path={routes.confirmEmail} element={<ConfirmEmailPage />} />
    <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
    <Route path={routes.changePassword} element={<ChangePasswordPage />} />
  </AppProvider>
);
