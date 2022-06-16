import {
  formatDistanceStrict as formatDistanceStrictBase,
  // eslint-disable-next-line import/no-duplicates
} from 'date-fns';
// eslint-disable-next-line import/no-duplicates
import { ru } from 'date-fns/locale';

/**
 * Форматирует интервал с учетом локализации.
 */
export const formatDistanceStrict = (
  ...args: Parameters<typeof formatDistanceStrictBase>
): ReturnType<typeof formatDistanceStrictBase> =>
  formatDistanceStrictBase(args[0], args[1], {
    locale: ru,
    ...args[2],
  });
