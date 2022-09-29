import { API_PREFIX, domainUrl, ports } from '@fuks-ru/fuks-blog-constants';
import { HttpStatus, Injectable } from '@nestjs/common';
import { I18nTranslation } from 'nestjs-i18n';

import { ErrorCode } from 'frontend/server/Config/enums/ErrorCode';
import { API_PAGE_PREFIX } from 'frontend/shared/lib/constants';

@Injectable()
export class ConfigGetter {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  public readonly statusResolver: Record<ErrorCode, HttpStatus> = {};

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return ports.BLOG_FRONTEND_PORT;
  }

  /**
   * Получает префикс для API страниц.
   */
  public getApiPagePrefix(): string {
    return API_PAGE_PREFIX;
  }

  /**
   * Получает корневой домен.
   */
  public getDomain(): string {
    return domainUrl;
  }

  /**
   * Получает префикс API.
   */
  public getApiPrefix(): string {
    return API_PREFIX;
  }

  /**
   * Получает lang-фразы.
   */
  public getTranslations(): {
    /**
     * Английские переводы.
     */
    'en-US': I18nTranslation;
    /**
     * Русские переводы.
     */
    'ru-RU': I18nTranslation;
  } {
    return {
      'ru-RU': {},
      'en-US': {},
    };
  }
}
