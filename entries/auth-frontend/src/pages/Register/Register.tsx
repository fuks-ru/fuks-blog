import { FC, useCallback } from 'react';

import { authApi } from 'auth-frontend/common/utils/initAuthApi';

/**
 * Страница регистрации.
 */
export const Register: FC = () => {
  const register = useCallback(() => {
    void authApi.registerBasic(null, {
      email: 'difuks@gmail.com',
      password: '12345654561',
    });
  }, []);

  return (
    <button type='button' onClick={register}>
      Зарегистрировать
    </button>
  );
};
