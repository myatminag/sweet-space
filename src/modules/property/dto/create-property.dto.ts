import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

import { IsAtLeastOnePriceProvided } from 'src/utils/custom-decorator';
import { PropertType, NoiseLevel } from 'src/utils/enum';

// const isValidAreaFormat = (value: string) => {
//   const areaRegex = /^\d+\s*sqft$/i;
//   return areaRegex.test(value);
// };

export class CreatePropertyDTO {
  @IsString()
  property_name: string;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsString()
  @IsOptional()
  renting_price?: string;

  @IsString()
  @IsOptional()
  selling_price?: string;

  @IsAtLeastOnePriceProvided()
  price: string;

  @IsEnum(PropertType)
  @IsNotEmpty({ message: 'Type is required!' })
  type: PropertType;

  @IsString()
  @IsNotEmpty({ message: 'Area is required!' })
  area: string;

  @IsNumber()
  @Min(1, {
    message: 'Bedroom count must be at least 1',
  })
  @Max(10, {
    message: 'Bedroom count cannot be more than 10',
  })
  bedroom: number;

  @IsNumber()
  @Min(1, {
    message: 'Bathroom count must be at least 1',
  })
  @Max(10, {
    message: 'Bathroom count cannot be more than 10',
  })
  bathroom: number;

  @IsBoolean()
  @IsOptional()
  access_pool: boolean = false;

  @IsBoolean()
  @IsOptional()
  allow_pet: boolean = false;

  @IsBoolean()
  @IsOptional()
  allow_parking: boolean = false;

  @IsString()
  place_name: string;

  @IsString()
  distance: string;

  @IsEnum(NoiseLevel)
  @IsNotEmpty({ message: 'Noise level is required!' })
  noise_level: NoiseLevel;

  @IsArray()
  @IsUUID('4', { each: true })
  images: string[];

  @IsNumber({}, { each: true })
  readonly users;
}
