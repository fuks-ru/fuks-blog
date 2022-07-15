import { FC } from 'react';

import { Table } from 'admin-frontend/shared/ui/Table/Table';
import { useRoleEnumMetadata } from 'admin-frontend/entities/role';
import { userApi, useUserTableData } from 'admin-frontend/entities/user';

/**
 * Страница пользователей.
 */
export const UsersPage: FC = () => {
  const roles = useRoleEnumMetadata();
  const { dataSource, columns } = useUserTableData(roles);
  const [updateUser] = userApi.useUserUpdateMutation();
  const [deleteUser] = userApi.useUserDeleteMutation();

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      handleSave={({ id, ...body }) => {
        void updateUser({ params: { id }, body });
      }}
      handleDelete={(id) => {
        void deleteUser(id);
      }}
    />
  );
};
