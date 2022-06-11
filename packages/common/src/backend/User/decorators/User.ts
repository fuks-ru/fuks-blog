import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): unknown => {
    const request = ctx.switchToHttp().getRequest<
      Request & {
        user: unknown;
      }
    >();

    return request.user;
  },
);
