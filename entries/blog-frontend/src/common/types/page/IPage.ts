import { NextComponentType } from 'next/dist/shared/lib/utils';

import { IPageContext } from './IPageContext';

/**
 * Расширяет стандартную Next-страницу кастомным контекстом.
 */
export type IPage<P = unknown, IP = P> = NextComponentType<
  IPageContext<P>,
  IP,
  P
>;
