import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ValidationErrorFactory } from 'common/modules/Validation/services/ValidationErrorFactory';

@Module({
  providers: [
    ValidationErrorFactory,
    {
      provide: APP_PIPE,
      useFactory: (validationErrorFactory: ValidationErrorFactory) =>
        new ValidationPipe({
          exceptionFactory:
            validationErrorFactory.createFromNestValidationErrors.bind(
              validationErrorFactory,
            ),
          whitelist: true,
          transform: true,
          skipMissingProperties: false,
          validationError: {
            target: false,
          },
        }),
      inject: [ValidationErrorFactory],
    },
  ],
})
export class ValidationModule {}
