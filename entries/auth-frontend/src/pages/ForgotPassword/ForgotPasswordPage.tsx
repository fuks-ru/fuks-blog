import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/components/Head/Head';
import { Layout } from 'auth-frontend/components/Layout/Layout';
import { ForgotPasswordForm } from 'auth-frontend/pages/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('passwordRecovery')} />
      <ForgotPasswordForm />
    </Layout>
  );
};

/**
 * Страница восстановления пароля.
 */
export default ForgotPasswordPage;
