import { FC, ReactNode, Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

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
  <BrowserRouter>
    <Suspense fallback={<Preloader />}>
      <ThemeProvider>
        <GoogleRecaptchaProvider>
          <RedirectFromProvider>
            <Routes>{children}</Routes>
          </RedirectFromProvider>
        </GoogleRecaptchaProvider>
      </ThemeProvider>
    </Suspense>
  </BrowserRouter>
);
