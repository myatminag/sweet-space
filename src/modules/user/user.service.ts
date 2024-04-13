import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { QueryFailedError } from 'typeorm';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDTO) {
    try {
      const salt = await genSalt();
      const hashPassword = await hash(dto.password, salt);

      const user = await this.userRepository.save({
        ...dto,
        password: hashPassword,
      });

      return user;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new ConflictException('Email already exists!');
      }

      throw error;
    }
  }

  async findUserByEmail(email: string) {
    const user = this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }
}
