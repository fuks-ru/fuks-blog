import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'Match' })
class MatchConstraint implements ValidatorConstraintInterface {
  /**
   * Метод, проверяющий соответствие одного свойства класса другому.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public validate(value: Object, args: ValidationArguments): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [relatedPropertyName] = args.constraints;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const relatedValue = (args.object as any)[relatedPropertyName];

    return value === relatedValue;
  }
}

/**
 * Декоратор class-validator, проверяющий соответствие одного свойства класса
 * другому.
 */
export const Match =
  (property: string, validationOptions?: ValidationOptions) =>
  // eslint-disable-next-line @typescript-eslint/ban-types
  (object: Object, propertyName: string): void => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
