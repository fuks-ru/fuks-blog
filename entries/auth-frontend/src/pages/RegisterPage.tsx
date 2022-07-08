import { FC } from 'react';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/shared/ui/Head';
import { LoginGoogle } from 'auth-frontend/features/LoginGoogle';
import { Register } from 'auth-frontend/features/Register';
import { Layout } from 'auth-frontend/widgets/Layout';

const RegisterPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('registration')} />
      <Space direction='vertical'>
        <Register />
        <LoginGoogle />
      </Space>
    </Layout>
  );
};

/**
 * Страница регистрации.
 */
export default RegisterPage;
