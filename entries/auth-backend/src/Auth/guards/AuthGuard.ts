import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as AuthGuardBase } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends AuthGuardBase('auth') {
  public constructor(private readonly reflector: Reflector) {
    super();
  }

  /**
   * Проверяет, можно ли пускать пользователя по маршруту.
   */
  public override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
