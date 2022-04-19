import { FC, useEffect } from 'react';
import { getApi } from '@difuks/blog-backend';

import { BLOG_BACKEND_URL } from 'blog-admin/common/constants';

/**
 * Главный компонент админки.
 */
export const App: FC = () => {
  useEffect(() => {
    (async () => {
      const api = await getApi(BLOG_BACKEND_URL);

      const categories = await api.categoryList();

      // eslint-disable-next-line no-console
      console.log(categories);
    })();
  }, []);

  return <div>Hello from App</div>;
};
