import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { Pagination } from './types';

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

export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = parseInt(req.query.page as string) || 1;
    const size = parseInt(req.query.size as string) || 10;

    if (isNaN(page) || isNaN(size)) {
      throw new BadRequestException('Invalid page or size!');
    }

    const limit = size;
    const offset = (page - 1) * size;

    return {
      page,
      limit,
      size,
      offset,
    };
  },
);
