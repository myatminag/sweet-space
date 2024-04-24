import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const existingUser = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already exists!');
    }

    const user = await this.userRepository.save(dto);

    delete user.password;

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOneBy({ user_id: id });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    delete user.password;

    return user;
  }

  async updateProfile(id: string, dto: UpdateUserDTO) {
    const user = await this.findUserById(id);

    const updatedData = Object.assign(user, dto);

    return await this.userRepository.save(updatedData);
  }
}
