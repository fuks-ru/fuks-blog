import Link from 'next/link';

import { IPage } from '@blog-frontend/common/types/page/IPage';
import { getSsp } from '@blog-frontend/common/utils/next/getSsp';
import { IPageProps } from '@blog-frontend/common/types/page/IPageProps';
import { ICategoryPageProps } from '@blog-frontend/pages/categories/[id]/index.page';

/**
 * Пропсы для главной страниы.
 */
export interface ICategoriesPageProps extends IPageProps {
  /**
   * Элементы категорий.
   */
  items: ICategoryPageProps[];
}

const Categories: IPage<ICategoriesPageProps> = ({ items }) => (
  <div>
    <Link href='/?a=3'>To main</Link>
    {items.map((item) => (
      <Link key={item.id} href={`/categories/${item.id}`}>
        <a href={`/categories/${item.id}`}>To {item.name}</a>
      </Link>
    ))}
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Страница списка категория.
 */
export default Categories;
