import { FC, useCallback } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { getApi } from '@difuks/auth-backend';

import { AUTH_BACKEND_URL } from 'admin-frontend/common/constants';

const clientId =
  '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com';

/**
 * Страница авторизации.
 */
export const Auth: FC = () => {
  const auth = useCallback(async (response: GoogleLoginResponse) => {
    const client = await getApi(AUTH_BACKEND_URL);

    await client.authGoogle(null, { token: response.tokenId });
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
