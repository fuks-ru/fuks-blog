import { Space } from 'antd';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/components/Head/Head';
import { LoginGoogle } from 'auth-frontend/components/LoginGoogle/LoginGoogle';
import { LoginForm } from 'auth-frontend/pages/Login/LoginForm/LoginForm';
import { Layout } from 'auth-frontend/components/Layout/Layout';

const LoginPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Space direction='vertical'>
        <Head title={t('login')} />
        <LoginForm />
        <LoginGoogle />
      </Space>
    </Layout>
  );
};

/**
 * Страница авторизации.
 */
export default LoginPage;
