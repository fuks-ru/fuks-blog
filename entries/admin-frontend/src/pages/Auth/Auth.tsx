import { FC } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';

interface IProps {}

const handleLogin = async (
  response: GoogleLoginResponse | GoogleLoginResponseOffline,
) => {
  if (!('tokenId' in response)) {
    throw new Error('Нет ответа от Google Api');
  }

  const res = await fetch(
    'http://localhost:3003/auth-backend/api/auth/google',
    {
      method: 'POST',
      body: JSON.stringify({
        token: response.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};

const clientId =
  '14083046227-pseubj6r7te7mtl1t831jsgnaak1cn47.apps.googleusercontent.com';

/**
 * Страница авторизации.
 */
export const Auth: FC<IProps> = ({}) => (
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
