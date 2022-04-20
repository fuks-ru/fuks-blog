import { FC } from 'react';

import { Auth } from 'admin-frontend/pages/Auth/Auth';
import { Categories } from 'admin-frontend/pages/Categories/Categories';

/**
 * Главный компонент админки.
 */
export const App: FC = () => (
  <div>
    Hello from App
    <Categories />
    <Auth />
  </div>
);
