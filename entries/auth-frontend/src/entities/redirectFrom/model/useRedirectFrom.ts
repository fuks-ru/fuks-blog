import { useContext } from 'react';

import { RedirectFromContext } from 'auth-frontend/entities/redirectFrom/model/RedirectFromContext';

/**
 * Хук, получающий контекст, хранящий url для редиректа.
 */
export const useRedirectFrom = (): string => useContext(RedirectFromContext);
