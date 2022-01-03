import Link from 'next/link';

import { IPage } from '../../common/types/page/IPage';
import { getSsp } from '../../common/utils/next/getSsp';
import { IPageProps } from '../../common/types/page/IPageProps';
import { ICategoryPageProps } from './[id]/index.page';

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
        To {item.name}
      </Link>
    ))}
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Страница списка категория.
 */
export default Categories;
