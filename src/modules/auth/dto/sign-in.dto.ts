import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { PASSWORD_REGEX } from 'src/constants/regex.constant';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message:
      'Please ensure it contains at least one uppercase letter, one lowercase letter, one digit or special character!',
  })
  password: string;
}
