import {
  ValidationError as NestValidationError,
  Injectable,
} from '@nestjs/common';

import { ValidationError } from 'common/backend/Validation/dto/ValidationError';

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

  /**
   * Создает объект ошибки валидации.
   */
  public createFromData<Data extends Record<string, string[]>>(
    data: Data,
  ): ValidationError<Data> {
    return new ValidationError(data);
  }
}
