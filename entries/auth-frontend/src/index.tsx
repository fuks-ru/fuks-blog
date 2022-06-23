import { initAuthApi } from '@difuks/api-auth-backend/dist/frontend';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'auth-frontend/App';
import 'auth-frontend/utils/i18n';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  await initAuthApi();

  const root = createRoot(container);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
})();
