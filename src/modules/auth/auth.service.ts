import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { EnvVariables } from '@/utils/types';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<EnvVariables>,
    private userService: UserService,
  ) {}

  async signup(dto: SignUpDto) {
    const user = await this.userService.create(dto);

    delete user.password;
    delete user.ph_number;

    return user;
  }

  async signin(dto: SignInDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const token = await this.generateAccessToken(user.user_id, user.email);

    return {
      user,
      ...token,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password!');
    }

    delete user.password;
    delete user.ph_number;

    return user;
  }

  async generateAccessToken(userId: string, email: string) {
    const accessToken = await this.jwtService.signAsync(
      { id: userId, email },
      {
        secret: this.configService.get('JWT_SECRET'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRES_IN'),
      },
    );

    const refreshToken = await this.jwtService.signAsync(
      {
        id: userId,
        email,
      },
      {
        algorithm: 'HS512',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
      },
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async forgotPassword(dto: ForgotPasswordDTO) {
    const user = await this.userService.findUserByEmail(dto.email);

    if (!user) {
      throw new NotFoundException('User not found!');
    }
  }
}
