import defaultNs from 'auth-frontend/shared/assets/locales/en-US.json';

declare module 'auth-frontend/shared/types/react-i18next' {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof defaultNs;
    };
  }
}
