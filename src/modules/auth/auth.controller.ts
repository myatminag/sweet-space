import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authSerivce.signup(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authSerivce.signin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile() {
    return 'profile';
  }
}
