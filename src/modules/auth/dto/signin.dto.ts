import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { PASSWORD_REGEX } from 'src/constants/regex.constant';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, { message: 'Password is too weak!' })
  password: string;
}
