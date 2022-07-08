import { Table } from 'antd';
import { FC } from 'react';

import { useUserTableData } from 'admin-frontend/entities/user';

/**
 * Страница пользователей.
 */
export const UsersPage: FC = () => {
  const { dataSource, columns } = useUserTableData();

  return <Table dataSource={dataSource} columns={columns} />;
};
