import { Space } from 'antd';
import { FC } from 'react';

import { LoginGoogle } from 'auth-frontend/components/LoginGoogle/LoginGoogle';
import { LoginForm } from 'auth-frontend/pages/Login/LoginForm/LoginForm';
import { Layout } from 'auth-frontend/components/Layout/Layout';

/**
 * Страница авторизации.
 */
export const LoginPage: FC = () => (
  <Layout>
    <Space direction='vertical'>
      <LoginForm />
      <LoginGoogle />
    </Space>
  </Layout>
);
