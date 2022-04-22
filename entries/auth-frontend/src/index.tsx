import { createRoot } from 'react-dom/client';

import { initAuthApi } from 'auth-frontend/common/utils/initAuthApi';
import { App } from 'auth-frontend/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  await initAuthApi();

  const root = createRoot(container);

  root.render(<App />);
})();
