import 'react-i18next';
import defaultNs from 'auth-frontend/public/locales/en-US.json';

declare module 'react-i18next' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof defaultNs;
    };
  }
}
