import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { API_PAGE_PREFIX } from '@fuks/blog-frontend/src/common/utils/constants';

import { makeFormatPageResponseInterceptor } from '../interceptors/FormatPageResponseInterceptor';

/**
 * Декоратор для отображения next-страницы. В Spa режиме отдает только json. В
 * ssr режиме рендерит html.
 */
export const Page = (page = ''): MethodDecorator => {
  const route = page.replace(/\[(\w+)]/g, ':$1');

  const decorators = [
    Get([`/${route}`, `${API_PAGE_PREFIX}/${route}`]),
    UseInterceptors(makeFormatPageResponseInterceptor(page)),
    ApiExcludeEndpoint(),
  ];

  return applyDecorators(...decorators);
};
