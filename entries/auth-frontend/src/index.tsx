import { createRoot } from 'react-dom/client';

import { App } from 'auth-frontend/App';
import { initAuthApi } from 'auth-frontend/common/utils/initAuthApi';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  await initAuthApi();

  const root = createRoot(container);

  root.render(<App />);
})();
