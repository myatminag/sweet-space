import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { Public } from './decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Public()
  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authSerivce.signup(dto);
  }

  @Public()
  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authSerivce.signin(dto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDTO) {
    return this.authSerivce.forgotPassword(dto);
  }
}
