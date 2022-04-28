import { createRoot } from 'react-dom/client';

import { App } from 'admin-frontend/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

(() => {
  const root = createRoot(container);

  root.render(<App />);
})();
