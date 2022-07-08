import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Получает значение кода подтверждения из url.
 */
export const useConfirmCode = (): string | null => {
  const [searchParams] = useSearchParams();

  return useMemo(() => searchParams.get('confirmCode'), [searchParams]);
};
