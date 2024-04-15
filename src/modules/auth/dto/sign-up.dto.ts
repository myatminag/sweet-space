import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

import { PASSWORD_REGEX } from '@/constants/regex.constant';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

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
