import { createRoot } from 'react-dom/client';

import { App } from 'blog-admin/App';

const container = document.querySelector('#app');

if (!container) {
  throw new Error('container is not defined');
}

const root = createRoot(container);

root.render(<App />);
