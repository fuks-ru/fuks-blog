import { FC, ReactNode, Suspense } from 'react';
import { Routes } from 'react-router-dom';

import { GoogleRecaptchaProvider } from 'auth-frontend/app/providers/GoogleRecaptchaProvider';
import { RedirectFromProvider } from 'auth-frontend/app/providers/RedirectFromProvider';
import { ThemeProvider } from 'auth-frontend/app/providers/ThemeProvider';
import { Preloader } from 'auth-frontend/shared/ui/Preloader';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер для всего приложения.
 */
export const AppProvider: FC<IProps> = ({ children }) => (
  <Suspense fallback={<Preloader />}>
    <ThemeProvider>
      <GoogleRecaptchaProvider>
        <RedirectFromProvider>
          <Routes>{children}</Routes>
        </RedirectFromProvider>
      </GoogleRecaptchaProvider>
    </ThemeProvider>
  </Suspense>
);
