import { OmitType } from '@nestjs/swagger';
import { SignInDto } from './sign-in.dto';

export class ForgotPasswordDTO extends OmitType(SignInDto, ['password']) {}
