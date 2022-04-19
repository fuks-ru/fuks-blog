import { FC, useEffect, useState } from 'react';
import { getApi, TApiResponse } from '@difuks/blog-backend';

import { BLOG_BACKEND_URL } from 'admin-frontend/common/constants';

/**
 * Главный компонент админки.
 */
export const App: FC = () => {
  const [categories, setCategories] = useState<TApiResponse<'categoryList'>>(
    [],
  );

  useEffect(() => {
    (async () => {
      const api = await getApi(BLOG_BACKEND_URL);

      const response = await api.categoryList();

      setCategories(response.data);
    })();
  }, []);

  return (
    <div>
      Hello from App <div>Categories:</div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
};
