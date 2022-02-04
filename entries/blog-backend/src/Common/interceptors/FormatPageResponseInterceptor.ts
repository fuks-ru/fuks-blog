import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  mixin,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';

import { ConfigGetter } from '../../Config/services/ConfigGetter';

@Injectable()
abstract class FormatPageResponseInterceptor implements NestInterceptor {
  protected abstract readonly pageFileName: string;

  public constructor(private readonly configGetter: ConfigGetter) {}

  /**
   * Перехватчик запроса, определяющий нужно ли отдать страницу и json.
   */
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const isApiPage = request.url.includes(
      this.configGetter.getApiPagePrefix(),
    );

    if (isApiPage) {
      return next.handle();
    }

    return next.handle().pipe(
      map(async (payload: Record<string, unknown>) => {
        // eslint-disable-next-line @typescript-eslint/await-thenable
        await response.render(this.pageFileName, payload);
      }),
    );
  }
}

/**
 * Определяет, нужно ли рендерить html страницу средствами next или просто отдать json.
 */
export const makeFormatPageResponseInterceptor = (page: string): Type =>
  mixin(
    class extends FormatPageResponseInterceptor {
      protected readonly pageFileName = page;
    },
  );
