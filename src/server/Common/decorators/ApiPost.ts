import { applyDecorators, Get } from '@nestjs/common';

import { API_PREFIX } from '@common/utils/constants';

/**
 * Декоратор для POST-api запросов.
 */
export const ApiPost = (route = ''): MethodDecorator => {
  const decorators = [Get(`${API_PREFIX}${route}`)];

  return applyDecorators(...decorators);
};
