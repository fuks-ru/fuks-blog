import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import requestContext from 'request-context';

import { RequestRefMiddleware } from 'common-backend/RequestRef/middlewares/RequestRefMiddleware';
import { RequestRefService } from 'common-backend/RequestRef/services/RequestRefService';
import { REQUEST_CONTEXT_ID } from 'common-backend/RequestRef/utils/constants';

@Global()
@Module({
  providers: [RequestRefService],
  exports: [RequestRefService],
})
export class RequestRefModule implements NestModule {
  /**
   * Регистрирует middleware, инициализирующий контекст для хранения request'а.
   */
  public configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(requestContext.middleware(REQUEST_CONTEXT_ID))
      .forRoutes('*')
      .apply(RequestRefMiddleware)
      .forRoutes('*');
  }
}
