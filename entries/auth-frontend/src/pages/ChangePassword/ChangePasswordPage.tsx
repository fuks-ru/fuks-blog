import { FC } from 'react';

import { Layout } from 'auth-frontend/components/Layout/Layout';
import { ChangePasswordForm } from 'auth-frontend/pages/ChangePassword/ChangePasswordForm/ChangePasswordForm';

/**
 * Страница смены пароля.
 */
export const ChangePasswordPage: FC = () => (
  <Layout>
    <ChangePasswordForm />
  </Layout>
);
