import { Button, Card, Form, Input } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { FC } from 'react';
import { css } from '@linaria/core';

import { useAuthForm } from 'auth-frontend/utils/api';
import { useForgotPasswordCode } from 'auth-frontend/pages/ChangePassword/ChangePasswordForm/hooks/useForgotPasswordCode';

/**
 * Форма смены пароля.
 */
export const ChangePasswordForm: FC = () => {
  const [form, onFinish] = useAuthForm('forgotPasswordChange');

  const forgotPasswordCode = useForgotPasswordCode();

  return (
    <Card title='Смена пароля'>
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
            placeholder='Пароль'
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item name='repeatPassword'>
          <Input
            type='password'
            placeholder='Повторите пароль'
            prefix={<LockOutlined className={opacityIcon} />}
          />
        </Form.Item>
        <Form.Item noStyle={true}>
          <Button type='primary' htmlType='submit'>
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const opacityIcon = css`
  opacity: 0.3;
`;
