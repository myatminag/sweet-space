import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { PASSWORD_REGEX } from '@/constants/regex';

export class ResetPasswordDTO {
  @IsString()
  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message:
      'Please ensure it contains at least one uppercase letter, one lowercase letter, one digit or special character!',
  })
  new_password: string;

  @IsString()
  @IsNotEmpty()
  readonly user_id: string;

  @IsString()
  @IsNotEmpty()
  reset_token: string;
}
