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
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsAtLeastOnePriceProvided } from '@/utils/custom-decorator';
import { PropertType, NoiseLevel } from '@/utils/enum';

// const isValidAreaFormat = (value: string) => {
//   const areaRegex = /^\d+\s*sqft$/i;
//   return areaRegex.test(value);
// };

class NearByPlaces {
  @IsString()
  place_name: string;

  @IsString()
  distance: string;
}

export class CreatePropertyDTO {
  @IsString()
  @IsNotEmpty()
  property_name: string;

  @IsString()
  @IsNotEmpty()
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

  @ValidateNested()
  @IsOptional()
  @Type(() => NearByPlaces)
  nearby_places: NearByPlaces[];

  @IsEnum(NoiseLevel)
  @IsNotEmpty({ message: 'Noise level is required!' })
  noise_level: NoiseLevel;

  @IsArray()
  @IsUUID('4', { each: true })
  images: string[];
}
