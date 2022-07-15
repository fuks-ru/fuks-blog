import { CustomDecorator, SetMetadata } from '@nestjs/common';

import { Role } from 'auth-backend/User/entities/User';

/**
 * Помечает роли, которым доступен маршрут.
 */
export const Roles = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
