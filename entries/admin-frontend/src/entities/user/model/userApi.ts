import { createAuthApi } from 'admin-frontend/shared/api/authApi';

/**
 * Возвращает хуки и редьюсер для работы с пользователями.
 */
export const userApi = createAuthApi({
  reducerPath: 'user',
  methods: {
    userList: { type: 'getList' },
    userUpdate: { type: 'update' },
    userDelete: { type: 'delete' },
  },
});
