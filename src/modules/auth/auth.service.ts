import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async signup(dto: SignUpDto) {
    const salt = await genSalt();
    dto.password = await hash(dto.password, salt);

    const user = await this.userRepository.save(dto);

    delete user.password;
    delete user.confirm_password;
    delete user.ph_number;

    return { ...user };
  }

  async signin(dto: SignInDto) {
    const user = await this.userRepository.findOneBy({ email: dto.email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatched = await compare(dto.password, user.password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid Password!');
    }

    delete user.password;
    delete user.ph_number;

    return { ...user };
  }
}
