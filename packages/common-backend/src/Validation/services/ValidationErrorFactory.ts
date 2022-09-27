import {
  ValidationError as NestValidationError,
  Injectable,
} from '@nestjs/common';

import { I18nValidationTranslator } from 'common-backend/I18n/services/I18nValidationTranslator';
import { I18nResolver } from 'common-backend/I18n/services/I18nResolver';
import { ValidationError } from 'common-backend/Validation/dto/ValidationError';

@Injectable()
export class ValidationErrorFactory {
  public constructor(
    private readonly i18nResolver: I18nResolver,
    private readonly i18nErrorTranslator: I18nValidationTranslator,
  ) {}

  /**
   * Создает объект ошибок валидации из ошибок Nest'а.
   */
  public async createFromNestValidationErrors(
    errors: NestValidationError[],
  ): Promise<ValidationError> {
    const i18n = await this.i18nResolver.resolve();

    const preparedErrors = Object.fromEntries(
      errors.map(({ property, constraints }) => [
        property,
        constraints ? Object.values(constraints) : [i18n.t('unknownError')],
      ]),
    ) as Record<string, string[]>;

    const translatedErrors = await this.i18nErrorTranslator.translateErrors(
      preparedErrors,
    );

    return new ValidationError(translatedErrors, i18n.t('validationError'));
  }

  /**
   * Создает объект ошибки валидации.
   */
  public async createFromData<Data extends Record<string, string[]>>(
    data: Data,
  ): Promise<ValidationError<Data>> {
    const i18n = await this.i18nResolver.resolve();

    return new ValidationError(data, i18n.t('validationError'));
  }
}
