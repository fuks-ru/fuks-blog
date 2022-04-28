import { ports } from '@difuks/common/dist/constants';
import { IErrorFilterModuleOptions } from '@difuks/common/dist/modules/ErrorFilter/types/IErrorFilterModuleOptions';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigGetterBase, SystemErrorFactory } from '@difuks/common';

import { API_PAGE_PREFIX } from 'blog-frontend/common/utils/constants';
import { ErrorCode } from 'blog-frontend/server/Config/enums/ErrorCode';

@Injectable()
export class ConfigGetter extends ConfigGetterBase {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  protected readonly statusResolver: Record<ErrorCode, HttpStatus> = {};

  public constructor(systemErrorFactory: SystemErrorFactory) {
    super(systemErrorFactory);
  }

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return ports.BLOG_FRONTEND_PORT;
  }

  /**
   * Получает порт для апи.
   */
  public override getErrorFilterConfig(): IErrorFilterModuleOptions {
    return {
      ...super.getErrorFilterConfig(),
      errorPageName: '_500',
    };
  }

  /**
   * Получает префикс маршрута для апи страницы.
   */
  public getApiPagePrefix(): string {
    return API_PAGE_PREFIX;
  }
}
