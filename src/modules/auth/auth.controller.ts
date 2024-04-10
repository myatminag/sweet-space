import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authSerivce.signup(dto);
  }

  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authSerivce.signin(dto);
  }
}
