import { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { GoogleRecaptchaProvider } from 'auth-frontend/components/GoogleRecaptcha/GoogleRecaptchaProvider';
import { ThemeProvider } from 'auth-frontend/components/ThemeProvider/ThemeProvider';
import { routes } from 'auth-frontend/utils/routes';
import { RedirectFromProvider } from 'auth-frontend/components/RedirectFromProvider/RedirectFromProvider';
import { Preloader } from 'auth-frontend/components/Preloader/Preloader';
import { ConfirmEmailPage } from 'auth-frontend/pages/ConfirmEmail/ConfirmEmailPage';

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
export const App: FC = () => (
  <GoogleRecaptchaProvider>
    <Suspense fallback={<Preloader />}>
      <ThemeProvider>
        <RedirectFromProvider>
          <Routes>
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.registration} element={<RegisterPage />} />
            <Route path={routes.confirmEmail} element={<ConfirmEmailPage />} />
            <Route
              path={routes.forgotPassword}
              element={<ForgotPasswordPage />}
            />
            <Route
              path={routes.changePassword}
              element={<ChangePasswordPage />}
            />
          </Routes>
        </RedirectFromProvider>
      </ThemeProvider>
    </Suspense>
  </GoogleRecaptchaProvider>
);
