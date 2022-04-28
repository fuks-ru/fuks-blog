import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';

import { API_PAGE_PREFIX } from 'blog-frontend/common/utils/constants';
import { makeFormatPageResponseInterceptor } from 'blog-frontend/server/Pages/interceptors/FormatPageResponseInterceptor';

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
