import { createRoot } from 'react-dom/client';

import { initAuthApi } from 'admin/shared/api/authApi';
import { App } from 'admin/app/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  const root = createRoot(container);

  await initAuthApi();

  root.render(<App />);
})();
