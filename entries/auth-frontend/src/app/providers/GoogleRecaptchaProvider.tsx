import { FC, ReactNode } from 'react';
import { GoogleReCaptchaProvider as GoogleReCaptchaProviderBase } from 'react-google-recaptcha-v3';
import { useTranslation } from 'react-i18next';

import { useTheme } from 'auth-frontend/entities/theme';

interface IProps {
  children: ReactNode;
}

const badgeId = 'google-recaptcha';

/**
 * Провайдер для Google Recaptcha 3.
 */
export const GoogleRecaptchaProvider: FC<IProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  return (
    <GoogleReCaptchaProviderBase
      reCaptchaKey={process.env.GOOGLE_RECAPTCHA_CLIENT_KEY as string}
      language={i18n.language}
      container={{
        element: badgeId,
        parameters: {
          theme,
          badge: 'bottomright',
        },
      }}
    >
      {children}
      <div id={badgeId} />
    </GoogleReCaptchaProviderBase>
  );
};
