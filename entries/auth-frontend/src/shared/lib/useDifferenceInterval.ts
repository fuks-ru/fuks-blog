import { useBoolean, useInterval } from 'react-use';
import { differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';

import { TStatus } from 'auth-frontend/shared/api/initAuthApi';

interface IParams {
  status: TStatus;
  timeout?: number;
}

interface IResult {
  isRunning: boolean;
  secondsToNextSend: number;
}

/**
 * Запускает интервал с определенным временем в случае success статуса1.
 */
export const useDifferenceInterval = ({
  status,
  timeout = 60,
}: IParams): IResult => {
  const [lastSendTime, setLastSendTime] = useState(new Date());
  const [lastUpdateTime, setLastUpdateTime] = useState(lastSendTime);
  const [isRunning, setIsRunning] = useBoolean(true);

  const lastUpdatedDifference = useMemo(
    () => differenceInSeconds(lastUpdateTime, lastSendTime),
    [lastSendTime, lastUpdateTime],
  );

  useInterval(
    () => {
      setLastUpdateTime(new Date());
    },
    isRunning ? 1_000 : null,
  );

  useEffect(() => {
    if (lastUpdatedDifference >= timeout) {
      setIsRunning(false);
    }
  }, [lastUpdatedDifference, setIsRunning, timeout]);

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    setIsRunning(true);
    setLastSendTime(new Date());
    setLastUpdateTime(new Date());
  }, [setIsRunning, status]);

  return {
    isRunning,
    secondsToNextSend: timeout - lastUpdatedDifference,
  };
};
