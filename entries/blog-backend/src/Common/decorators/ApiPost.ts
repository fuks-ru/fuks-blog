import { applyDecorators, Get } from '@nestjs/common';

import { API_PREFIX } from '../../Config/services/ConfigGetter';

/**
 * Декоратор для POST-api запросов.
 */
export const ApiPost = (route = ''): MethodDecorator => {
  const decorators = [Get(`${API_PREFIX}${route}`)];

  return applyDecorators(...decorators);
};
