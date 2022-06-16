import { addSeconds, differenceInSeconds } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useBoolean, useInterval } from 'react-use';
import { localeDate } from '@difuks/common/dist/frontend';

import { useRedirectFromContext } from 'auth-frontend/hooks/useRedirectFrom';
import { useAuthApi } from 'auth-frontend/common/api';

interface IParams {
  email: string;
}

interface IResult {
  humanTimeout: string;
  onResendClick: () => Promise<void>;
  isRunning: boolean;
}

/**
 * Предоставляет метод для отправки кода подтверждения, человекочитаемое время
 * до попытки повторной отправки и флаг, определяющий запущен ли таймер в данный момент.
 */
export const useConfirmResendInterval = ({ email }: IParams): IResult => {
  const [resendConfirm, , status] = useAuthApi('registerResendConfirm');

  const [lastSendTime, setLastSendTime] = useState(new Date());
  const [lastUpdateTime, setLastUpdateTime] = useState(lastSendTime);
  const [isRunning, setIsRunning] = useBoolean(true);

  const redirectFrom = useRedirectFromContext();

  useInterval(
    () => {
      setLastUpdateTime(new Date());
    },
    isRunning ? 1_000 : null,
  );

  const humanTimeout = useMemo(
    () =>
      localeDate.formatDistanceStrict(
        addSeconds(lastSendTime, 60),
        lastUpdateTime,
      ),
    [lastSendTime, lastUpdateTime],
  );

  useEffect(() => {
    const lastUpdatedDifference = differenceInSeconds(
      lastUpdateTime,
      lastSendTime,
    );

    if (lastUpdatedDifference >= 60) {
      setIsRunning(false);
    }
  }, [lastSendTime, lastUpdateTime, setIsRunning]);

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    setIsRunning(true);
    setLastSendTime(new Date());
    setLastUpdateTime(new Date());
  }, [setIsRunning, status]);

  const onResendClick = useCallback(async () => {
    await resendConfirm({ email, redirectFrom });
  }, [email, redirectFrom, resendConfirm]);

  return {
    humanTimeout,
    onResendClick,
    isRunning,
  };
};
