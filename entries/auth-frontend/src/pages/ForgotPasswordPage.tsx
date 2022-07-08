import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/shared/ui/Head';
import { Layout } from 'auth-frontend/widgets/Layout';
import { SendPasswordChange } from 'auth-frontend/features/SendPasswordChange';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('passwordRecovery')} />
      <SendPasswordChange />
    </Layout>
  );
};

/**
 * Страница восстановления пароля.
 */
export default ForgotPasswordPage;
