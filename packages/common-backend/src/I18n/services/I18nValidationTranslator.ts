import { Injectable } from '@nestjs/common';

import { I18nResolver } from 'common-backend/I18n/services/I18nResolver';

@Injectable()
export class I18nValidationTranslator {
  public constructor(private readonly i18nResolver: I18nResolver) {}

  /**
   * Переводит ошибки валидации.
   */
  public async translateErrors(
    errors: Record<string, string[]>,
  ): Promise<Record<string, string[]>> {
    const i18n = await this.i18nResolver.resolve();

    return Object.fromEntries(
      Object.entries(errors).map(([key, value]) => {
        const currentError = value.map((errorItem) => {
          const [translationKey, argsString] = errorItem.split('|');

          if (!translationKey) {
            return errorItem;
          }

          const args = argsString
            ? (JSON.parse(argsString) as Record<string, unknown>)
            : {};

          return i18n.t<string>(translationKey, {
            args: { property: key, ...args },
          });
        });

        return [key, currentError];
      }),
    );
  }
}
