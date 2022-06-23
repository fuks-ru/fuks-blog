import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/components/Head/Head';
import { Layout } from 'auth-frontend/components/Layout/Layout';
import { ChangePasswordForm } from 'auth-frontend/pages/ChangePassword/ChangePasswordForm/ChangePasswordForm';

const ChangePasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('changePassword')} />
      <ChangePasswordForm />
    </Layout>
  );
};

/**
 * Страница смены пароля.
 */
export default ChangePasswordPage;
