import { OmitType } from '@nestjs/swagger';
import { UserDTO } from './user.dto';

export class CreateUserDTO extends OmitType(UserDTO, ['ph_number']) {}
