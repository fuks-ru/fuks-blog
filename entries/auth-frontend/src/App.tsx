import { FC } from 'react';

import { Register } from 'auth-frontend/pages/Register/Register';
import { Auth } from 'auth-frontend/pages/Auth/Auth';

/**
 * Главный компонент авторизации.
 */
export const App: FC = () => (
  <div>
    Hello from App
    <Auth />
    <Register />
  </div>
);
