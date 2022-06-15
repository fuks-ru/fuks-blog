import { ports } from '@difuks/common/dist/constants';
import {
  IErrorFilterModuleOptions,
  ConfigGetterBase,
  SystemErrorFactory,
} from '@difuks/common';
import { HttpStatus, Injectable } from '@nestjs/common';

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
}
