import { TApiResponse } from '@difuks/auth-backend';
import { FC, useEffect, useState } from 'react';

import { authApi } from 'admin-frontend/utils/api';

/**
 * Главный компонент админки.
 */
export const App: FC = () => {
  const [users, setUsers] = useState<TApiResponse<'userList'>>([]);

  useEffect(() => {
    (async () => {
      const list = await authApi.userList();

      setUsers(list.data);
    })();
  }, []);

  return (
    <div>
      <div>Users:</div>
      {users.map((user) => (
        <div key={user.id}>
          email: {user.email} | role: {user.role}
        </div>
      ))}
    </div>
  );
};
