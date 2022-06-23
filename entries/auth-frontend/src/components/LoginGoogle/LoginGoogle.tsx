import { Form, Input, message } from 'antd';
import { FC, useCallback } from 'react';
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';

import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { useAuthForm } from 'auth-frontend/utils/api';

/**
 * Страница авторизации.
 */
export const LoginGoogle: FC = () => {
  const redirectFrom = useRedirectFromContext();
  const [form, onFinish] = useAuthForm('loginGoogle');
  const { t } = useTranslation();

  const handleGoogleResponse = useCallback(
    (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
      if (!('tokenId' in response)) {
        void message.error(t('googleApiResponseError'));

        return;
      }

      form.setFieldsValue({
        accessToken: response.tokenId,
      });

      form.submit();
    },
    [form, t],
  );

  return (
    <Form form={form} initialValues={{ redirectFrom }} onFinish={onFinish}>
      <Form.Item name='redirectFrom' hidden={true}>
        <Input hidden={true} readOnly={true} />
      </Form.Item>
      <Form.Item name='accessToken'>
        <GoogleLogin
          clientId={process.env.FUKS_BLOG_AUTH_GOOGLE_CLIENT_ID as string}
          buttonText={t('loginWithGoogle')}
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
