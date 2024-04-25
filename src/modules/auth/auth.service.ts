import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { genSalt, hash } from 'bcryptjs';
import ms from 'ms';

import { EnvVariables } from 'src/lib/types';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { ForgotPasswordDTO } from './dto/forgot-password.dto';
import { UserService } from '@/modules/user/user.service';
import { MailService } from '@/modules/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private mailService: MailService,
    private configService: ConfigService<EnvVariables>,
  ) {}

  async signUp(dto: SignUpDto) {
    const salt = await genSalt();
    const hashPassword = await hash(dto.password, salt);

    const user = await this.userService.createUser({
      ...dto,
      password: hashPassword,
    });

    const token = await this.generateToken(user.user_id, user.email);

    return {
      user,
      ...token,
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const token = await this.generateToken(user.user_id, user.email);

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

  async forgotPassword(dto: ForgotPasswordDTO) {
    const user = await this.userService.findUserByEmail(dto.email);

    return await this.mailService.forgotPasswordMail(user);
  }

  async refreshToken(token: string) {
    const tokenData = token.split(' ')[1];

    const decodedToken = await this.jwtService.decode(tokenData);

    const { id, email } = decodedToken;

    return await this.generateToken(id, email);
  }

  private async generateToken(userId: string, email: string) {
    const tokenExpiresIn = this.configService.getOrThrow(
      'ACCESS_TOKEN_EXPIRES_IN',
    );

    const expireIn = Date.now() + ms(tokenExpiresIn);

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        { id: userId, email },
        {
          secret: this.configService.get('JWT_SECRET'),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          algorithm: 'HS512',
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expire_in: expireIn,
    };
  }
}
