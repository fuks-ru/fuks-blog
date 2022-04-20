import { FC, useEffect, useState } from 'react';
import { TApiResponse, getApi } from '@difuks/blog-backend';

import { BLOG_BACKEND_URL } from 'admin-frontend/common/constants';

/**
 * Страница категори.
 */
export const Categories: FC = () => {
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
      <div>Categories:</div>
      {categories.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </div>
  );
};
