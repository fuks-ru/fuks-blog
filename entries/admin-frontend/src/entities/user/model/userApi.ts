import { createApi } from '@reduxjs/toolkit/query/react';

import { authBaseQuery, getEndpoints } from 'admin-frontend/shared/api/authApi';

/**
 * Апи для работы с пользователями.
 */
export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: authBaseQuery(),
  endpoints: getEndpoints([{ name: 'userList' }]),
});
