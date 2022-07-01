import { createRoot } from 'react-dom/client';

import { initAuthApi } from 'admin-frontend/utils/api';
import { App } from 'admin-frontend/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  const root = createRoot(container);

  await initAuthApi();

  root.render(<App />);
})();
