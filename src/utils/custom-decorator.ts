import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsAtLeastOnePriceProvided(
  validationOptions?: ValidationOptions,
) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isAtLeastOnePriceProvided',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const rentingPrice = args.object['renting_price'];
          const sellingPrice = args.object['selling_price'];
          return (
            (rentingPrice !== undefined && rentingPrice !== null) ||
            (sellingPrice !== undefined && sellingPrice !== null)
          );
        },
        defaultMessage() {
          return 'At least one of renting_price or selling_price must be provided!';
        },
      },
    });
  };
}
