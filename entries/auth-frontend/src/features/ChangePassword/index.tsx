import { Button, Card, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { css } from '@linaria/core';
import { useTranslation } from 'react-i18next';

import { useAuthForm } from 'auth-frontend/shared/api';
import { useForgotPasswordCode } from 'auth-frontend/features/ChangePassword/model/useForgotPasswordCode';

/**
 * Форма смены пароля.
 */
export const ChangePassword: FC = () => {
  const [form, onFinish] = useAuthForm('forgotPasswordChange');
  const { t } = useTranslation();

  const forgotPasswordCode = useForgotPasswordCode();

  return (
    <Card title={t('changePassword')}>
      <Form
        form={form}
        initialValues={{ forgotPasswordCode }}
        onFinish={onFinish}
      >
        <Form.Item name='forgotPasswordCode' noStyle={true}>
          <Input hidden={true} readOnly={true} />
        </Form.Item>
        <Form.Item name='password'>
          <Input
            type='password'
            placeholder={t('password')}
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item name='repeatPassword'>
          <Input
            type='password'
            placeholder={t('repeatPassword')}
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button type='primary' htmlType='submit'>
            {t('send')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
