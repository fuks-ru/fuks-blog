import { Button } from '@difuks/ui';
import Link from 'next/link';

import { IPage } from 'blog-frontend/common/types/page/IPage';
import { getSsp } from 'blog-frontend/common/utils/next/getSsp';
import { IPageProps } from 'blog-frontend/common/types/page/IPageProps';

/**
 * Пропсы для главной страницы.
 */
export interface IIndexPageProps extends IPageProps {
  /**
   * Сообщения для отображения.
   */
  message: string;
}

const Index: IPage<IIndexPageProps> = ({ message }) => (
  <div>
    {message}
    <Link href='/categories'>To Categories</Link>
    <Button>Hello</Button>
  </div>
);

export const getServerSideProps = getSsp();

/**
 * Главная страница.
 */
export default Index;
