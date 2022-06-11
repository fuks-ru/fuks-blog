import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initApi } from 'auth-frontend/common/api';
import { App } from 'auth-frontend/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(async () => {
  await initApi();

  const root = createRoot(container);

  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
})();
