import { FC, useCallback } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

import { authApi } from 'auth-frontend/common/utils/initAuthApi';

const clientId =
  '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com';

/**
 * Страница авторизации.
 */
export const Auth: FC = () => {
  const auth = useCallback(async (response: GoogleLoginResponse) => {
    await authApi.authGoogle(null, { accessToken: response.tokenId });
  }, []);

  const login = useCallback(() => {
    void authApi.authBasicLogin(null, {
      email: 'difuks@gmail.com',
      password: '12345654561',
    });
  }, []);

  const handleLogin = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!('tokenId' in response)) {
        throw new Error('Нет ответа от Google Api');
      }

      void auth(response);
    },
    [auth],
  );

  return (
    <div>
      <button type='button' onClick={login}>
        Login
      </button>
      <GoogleLogin
        clientId={clientId}
        buttonText='Log in with Google'
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy='single_host_origin'
      />
    </div>
  );
};
