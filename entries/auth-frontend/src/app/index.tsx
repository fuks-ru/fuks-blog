import { createRoot } from 'react-dom/client';

import { initAuthApi } from 'auth-frontend/shared/api/initAuthApi';
import { App } from 'auth-frontend/app/App';
import 'auth-frontend/shared/config/i18n';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  await initAuthApi();

  const root = createRoot(container);

  root.render(<App />);
})();
