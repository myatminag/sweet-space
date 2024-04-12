import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { EnvVariables } from 'src/utils/types';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<EnvVariables>,
    private readonly userService: UserService,
  ) {}

  async signup(dto: SignUpDto) {
    return await this.userService.create(dto);
  }

  async signin(dto: SignInDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const { accessToken, refreshToken } = await this.generateAccessToken(
      user.id,
      user.email,
    );

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password!');
    }

    delete user.password;

    return { ...user };
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

    return { accessToken, refreshToken };
  }
}
