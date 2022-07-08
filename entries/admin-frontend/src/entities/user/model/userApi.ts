import { TApiResponse } from '@difuks/auth-backend/dist/lib';
import { createApi } from '@reduxjs/toolkit/query/react';

import { authBaseQuery } from 'admin-frontend/shared/api/authApi';

/**
 * Апи для работы с пользователями.
 */
export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: authBaseQuery(),
  endpoints: (build) => ({
    getList: build.query<TApiResponse<'userList'>, void>({
      query: () => ({ method: 'userList' }),
    }),
  }),
});
