import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { IsEqual } from 'src/utils/custom-decorator';
import { PASSWORD_REGEX } from 'src/constants/regex.constant';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, { message: 'Password is too weak!' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEqual('password')
  confirm_password: string;
}
