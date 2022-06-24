import { useEffect, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

/**
 * Возвращает токен верификации Google капчи.
 */
export const useRecaptchaToken = (): string => {
  const [recaptchaToken, setRecaptchaToken] = useState<string>();

  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (!executeRecaptcha) {
      return;
    }

    (async () => {
      const token = await executeRecaptcha();

      setRecaptchaToken(token);
    })();
  }, [executeRecaptcha]);

  return recaptchaToken || '';
};
