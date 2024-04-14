import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTO extends OmitType(CreateUserDTO, ['password']) {
  @IsString()
  @IsOptional()
  @Length(9, 15)
  ph_number: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  image: string;
}
