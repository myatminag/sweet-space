import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authSerivce: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @Public()
  @Post('sign-up')
  signUp(@Body() dto: SignUpDto) {
    return this.authSerivce.signUp(dto);
  }

  @ApiOperation({ summary: 'Sign in user' })
  @Public()
  @Post('sign-in')
  signIn(@Body() dto: SignInDto) {
    return this.authSerivce.signIn(dto);
  }

  @ApiOperation({ summary: 'Forgot password' })
  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDTO) {
    return this.authSerivce.forgotPassword(dto);
  }

  @ApiOperation({ summary: 'Generate a new access token' })
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  refreshToken(@Headers('authorization') token: string) {
    return this.authSerivce.refreshToken(token);
  }
}
