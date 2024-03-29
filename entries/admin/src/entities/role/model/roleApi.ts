import { createAuthApi } from 'admin/shared/api/authApi';

/**
 * Возвращает хуки и редьюсер для работы с ролями.
 */
export const roleApi = createAuthApi({
  reducerPath: 'role',
  methods: {
    roleList: { type: 'getList' },
  },
});
