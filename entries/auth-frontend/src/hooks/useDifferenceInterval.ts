import { useBoolean, useInterval } from 'react-use';
import { addSeconds, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { localeDate } from '@difuks/common/dist/frontend';

import { TStatus } from 'auth-frontend/utils/api';

interface IParams {
  status: TStatus;
  timeout?: number;
}

interface IResult {
  humanTimeout: string;
  isRunning: boolean;
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

  useInterval(
    () => {
      setLastUpdateTime(new Date());
    },
    isRunning ? 1_000 : null,
  );

  const humanTimeout = useMemo(
    () =>
      localeDate.formatDistanceStrict(
        addSeconds(lastSendTime, timeout),
        lastUpdateTime,
      ),
    [lastSendTime, lastUpdateTime, timeout],
  );

  useEffect(() => {
    const lastUpdatedDifference = differenceInSeconds(
      lastUpdateTime,
      lastSendTime,
    );

    if (lastUpdatedDifference >= timeout) {
      setIsRunning(false);
    }
  }, [lastSendTime, lastUpdateTime, setIsRunning, timeout]);

  useEffect(() => {
    if (status !== 'success') {
      return;
    }

    setIsRunning(true);
    setLastSendTime(new Date());
    setLastUpdateTime(new Date());
  }, [setIsRunning, status]);

  return {
    humanTimeout,
    isRunning,
  };
};
