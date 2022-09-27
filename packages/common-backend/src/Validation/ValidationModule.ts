import {
  Global,
  Module,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { ValidationErrorFactory } from 'common-backend/Validation/services/ValidationErrorFactory';

@Global()
@Module({
  providers: [
    ValidationErrorFactory,
    {
      provide: APP_PIPE,
      useFactory: (validationErrorFactory: ValidationErrorFactory) =>
        new ValidationPipe({
          exceptionFactory: (validationError: ValidationError[]) =>
            validationErrorFactory.createFromNestValidationErrors(
              validationError,
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
  exports: [ValidationErrorFactory],
})
export class ValidationModule {}
