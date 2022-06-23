import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/components/Head/Head';
import { LoginGoogle } from 'auth-frontend/components/LoginGoogle/LoginGoogle';
import { RegisterForm } from 'auth-frontend/pages/Register/RegisterForm/RegisterForm';
import { Layout } from 'auth-frontend/components/Layout/Layout';

const RegisterPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('registration')} />
      <Space direction='vertical'>
        <RegisterForm />
        <LoginGoogle />
      </Space>
    </Layout>
  );
};

/**
 * Страница регистрации.
 */
export default RegisterPage;
