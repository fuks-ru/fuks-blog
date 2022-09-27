import { Injectable } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { I18nRequestScopeService } from 'nestjs-i18n';

import { RequestRefService } from 'common-backend/RequestRef/services/RequestRefService';

@Injectable()
export class I18nResolver {
  public constructor(
    private readonly moduleRef: ModuleRef,
    private readonly requestRef: RequestRefService,
  ) {}

  /**
   * Получает request-scoped инстанс i18n-сервиса.
   */
  public resolve(): Promise<I18nRequestScopeService> {
    const request = this.requestRef.getRequest();

    const contextId = ContextIdFactory.getByRequest(request);

    this.moduleRef.registerRequestByContextId(request, contextId);

    return this.moduleRef.resolve(I18nRequestScopeService, contextId, {
      strict: false,
    });
  }
}
