import { FC } from 'react';

import { Layout } from 'auth-frontend/components/Layout/Layout';
import { ForgotPasswordForm } from 'auth-frontend/pages/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm';

/**
 * Страница восстановления пароля.
 */
export const ForgotPasswordPage: FC = () => (
  <Layout>
    <ForgotPasswordForm />
  </Layout>
);
