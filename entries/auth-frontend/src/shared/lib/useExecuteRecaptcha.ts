import { useCallback } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

/**
 * Возвращает токен верификации Google капчи.
 */
export const useExecuteRecaptcha = (): ((
  action?: string,
) => Promise<string>) => {
  const { executeRecaptcha } = useGoogleReCaptcha();

  return useCallback(
    (action?: string) => {
      if (!executeRecaptcha) {
        return Promise.resolve('');
      }

      return executeRecaptcha(action);
    },
    [executeRecaptcha],
  );
};
