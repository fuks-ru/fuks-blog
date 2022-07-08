import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Получает значение кода для смены пароля из url.
 */
export const useForgotPasswordCode = (): string | null => {
  const [searchParams] = useSearchParams();

  return useMemo(() => searchParams.get('forgotPasswordCode'), [searchParams]);
};
