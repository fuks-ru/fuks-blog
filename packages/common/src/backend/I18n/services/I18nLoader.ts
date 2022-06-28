import { Inject, Injectable } from '@nestjs/common';
import {
  I18N_LOADER_OPTIONS,
  I18nLoader as I18nLoaderBase,
  I18nTranslation,
} from 'nestjs-i18n';

interface II18nLoaderOptions {
  languages: string[];
  translations: I18nTranslation;
}

@Injectable()
export class I18nLoader extends I18nLoaderBase {
  public constructor(
    @Inject(I18N_LOADER_OPTIONS) private readonly options: II18nLoaderOptions,
  ) {
    super();
  }

  /**
   * Получает список доступных языков.
   */
  public languages(): Promise<string[]> {
    return Promise.resolve(this.options.languages);
  }

  /**
   * Получает список доступных переводов.
   */
  public load(): Promise<I18nTranslation> {
    return Promise.resolve(this.options.translations);
  }
}
