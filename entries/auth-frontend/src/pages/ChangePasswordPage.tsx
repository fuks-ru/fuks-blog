import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Head } from 'auth-frontend/shared/ui/Head';
import { Layout } from 'auth-frontend/widgets/Layout';
import { ChangePassword } from 'auth-frontend/features/ChangePassword';

const ChangePasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <Head title={t('changePassword')} />
      <ChangePassword />
    </Layout>
  );
};

/**
 * Страница смены пароля.
 */
export default ChangePasswordPage;
