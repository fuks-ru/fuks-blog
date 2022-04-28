import {
  ValidationError as NestValidationError,
  Injectable,
} from '@nestjs/common';

import { ValidationError } from 'common/modules/Validation/dto/ValidationError';

@Injectable()
export class ValidationErrorFactory {
  /**
   * Создает объект ошибок валидации из ошибок Nest'а.
   */
  public createFromNestValidationErrors<Data extends Record<string, string[]>>(
    errors: NestValidationError[],
  ): ValidationError<Data> {
    const preparedErrors: Data = Object.fromEntries(
      errors.map(({ property, constraints }) => [
        property,
        constraints ? Object.values(constraints) : ['Неизвестная ошибка'],
      ]),
    ) as Data;

    return new ValidationError(preparedErrors);
  }
}
