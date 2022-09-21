import { message } from 'antd';
import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuthApi } from 'auth-frontend/shared/api';
import { useConfirmCode } from 'auth-frontend/features/ConfirmEmail/model/useConfirmCode';

/**
 * Страница для отправки данных для активации пользователя по коду
 * подтверждения.
 */
export const ConfirmEmail: FC = () => {
  const confirmCode = useConfirmCode();
  const [confirmationConfirm] = useAuthApi('confirmationConfirm');
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      if (!confirmCode) {
        await message.error(t('incorrectConfirmLink'));

        return;
      }

      await confirmationConfirm({
        confirmCode,
      });
    })();
  }, [confirmCode, confirmationConfirm, t]);

  return null;
};
