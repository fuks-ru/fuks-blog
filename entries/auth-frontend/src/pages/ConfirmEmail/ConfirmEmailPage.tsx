import { message } from 'antd';
import { FC, useEffect } from 'react';

import { useAuthApi } from 'auth-frontend/utils/api';
import { useConfirmCode } from 'auth-frontend/pages/ConfirmEmail/hooks/useConfirmCode';

/**
 * Страница для отправки данных для активации пользователя по коду подтверждения.
 */
export const ConfirmEmailPage: FC = () => {
  const confirmCode = useConfirmCode();
  const [confirmationConfirm] = useAuthApi('confirmationConfirm');

  useEffect(() => {
    (async () => {
      if (!confirmCode) {
        await message.error('Некорректная ссылка для подтверждения');

        return;
      }

      await confirmationConfirm({
        confirmCode,
      });
    })();
  }, [confirmCode, confirmationConfirm]);

  return null;
};
