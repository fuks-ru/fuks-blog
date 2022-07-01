import { CustomDecorator, SetMetadata } from '@nestjs/common';

/**
 * Помечает маршрут как публичный.
 */
export const Public = (): CustomDecorator<string> =>
  SetMetadata('isPublic', true);
