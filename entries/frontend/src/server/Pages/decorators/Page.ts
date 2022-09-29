import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';

import { makeFormatPageResponseInterceptor } from 'frontend/server/Pages/interceptors/FormatPageResponseInterceptor';
import { API_PAGE_PREFIX } from 'frontend/shared/lib/constants';

/**
 * Декоратор для отображения next-страницы. В Spa режиме отдает только json. В
 * ssr режиме рендерит html.
 */
export const Page = (page = ''): MethodDecorator => {
  const route = page.replace(/\[(\w+)]/g, ':$1');

  const decorators = [
    Get([`/${route}`, `${API_PAGE_PREFIX}/${route}`]),
    UseInterceptors(makeFormatPageResponseInterceptor(page)),
  ];

  return applyDecorators(...decorators);
};
