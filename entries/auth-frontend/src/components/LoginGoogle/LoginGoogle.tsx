import { Form, Input, message } from 'antd';
import { FC, useCallback } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { css } from '@linaria/core';

import { GOOGLE_CLIENT_ID } from 'auth-frontend/common/constants';
import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { useAuthForm } from 'auth-frontend/common/api';

/**
 * Страница авторизации.
 */
export const LoginGoogle: FC = () => {
  const redirectFrom = useRedirectFromContext();
  const [form, onFinish] = useAuthForm('loginGoogle');

  const handleGoogleResponse = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!('tokenId' in response)) {
        void message.error('Нет ответа от Google Api');

        return;
      }

      form.setFieldsValue({
        accessToken: response.tokenId,
      });

      form.submit();
    },
    [form],
  );

  return (
    <Form form={form} initialValues={{ redirectFrom }} onFinish={onFinish}>
      <Form.Item name='redirectFrom' hidden={true}>
        <Input hidden={true} readOnly={true} />
      </Form.Item>
      <Form.Item name='accessToken'>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText='Войти через Google'
          onSuccess={handleGoogleResponse}
          onFailure={handleGoogleResponse}
          cookiePolicy='single_host_origin'
          className={googleLogin}
        />
      </Form.Item>
    </Form>
  );
};

const googleLogin = css`
  width: 100%;
`;
