import { FC } from 'react';
import { Space } from 'antd';

import { LoginGoogle } from 'auth-frontend/components/LoginGoogle/LoginGoogle';
import { RegisterForm } from 'auth-frontend/pages/Register/RegisterForm/RegisterForm';
import { Layout } from 'auth-frontend/components/Layout/Layout';

/**
 * Страница регистрации.
 */
export const RegisterPage: FC = () => (
  <Layout>
    <Space direction='vertical'>
      <RegisterForm />
      <LoginGoogle />
    </Space>
  </Layout>
);
