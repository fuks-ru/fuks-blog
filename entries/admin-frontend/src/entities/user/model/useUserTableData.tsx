import { Checkbox } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Components } from '@difuks/auth-backend';
import { useMemo } from 'react';

import { userApi } from 'admin-frontend/entities/user/model/userApi';

const columns: ColumnsType<Components.Schemas.User> = [
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Is confirmed',
    dataIndex: 'isConfirmed',
    key: 'isConfirmed',
    render: (value: boolean) => <Checkbox checked={value} disabled={true} />,
  },
];

interface IResult {
  columns: ColumnsType<Components.Schemas.User>;
  dataSource: Components.Schemas.User[];
}

/**
 * Получает данные для отрисовки таблицы пользователей.
 */
export const useUserTableData = (): IResult => {
  const { data } = userApi.useUserListQuery();

  const dataSource = useMemo(
    () => data?.map((item) => ({ ...item, key: item.id })) || [],
    [data],
  );

  return { columns, dataSource };
};
