import { FC, ReactNode } from 'react';
import { GoogleReCaptchaProvider as GoogleReCaptchaProviderBase } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';

interface IProps {
  children: ReactNode;
}

/**
 * Провайдер для Google Recaptcha 3.
 */
export const GoogleRecaptchaProvider: FC<IProps> = ({ children }) => {
  const { i18n } = useTranslation();

  return (
    <GoogleReCaptchaProviderBase
      reCaptchaKey={process.env.GOOGLE_RECAPTCHA_CLIENT_KEY}
      language={i18n.language}
    >
      {children}
    </GoogleReCaptchaProviderBase>
  );
};
