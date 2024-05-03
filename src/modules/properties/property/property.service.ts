import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pagination } from 'src/lib/types';
import { UserService } from '../../user/user.service';
import { Property } from './entities/property.entity';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { UpdatePropertyDTO } from './dto/update-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    private userService: UserService,
  ) {}

  async createProperty(userId: string, dto: CreatePropertyDTO) {
    const user = await this.userService.findById(userId);

    const property = await this.propertyRepository.save({
      ...dto,
      user,
    });

    return property;
  }

  async findAllProperties({ page, limit, size, offset }: Pagination) {
    const [property, total] = await this.propertyRepository.findAndCount({
      take: limit,
      skip: offset,
      relations: ['user'],
    });

    return {
      page,
      size,
      total_items: total,
      items: property,
    };
  }

  async findPropertyById(id: string) {
    const property = await this.propertyRepository.findOne({
      where: {
        id,
      },
      relations: ['user'],
    });

    if (!property) {
      throw new NotFoundException('Property not found!');
    }

    return property;
  }

  async updateProperty(id: string, dto: UpdatePropertyDTO) {
    const property = await this.findPropertyById(id);

    const { images, ...updatedData } = dto;

    property.images = images;

    Object.assign(property, updatedData);

    return await this.propertyRepository.save(property);
  }

  async deleteProperty(id: string) {
    const property = await this.findPropertyById(id);

    if (!property) {
      throw new NotFoundException('Property not found!');
    }

    return await this.propertyRepository.remove(property);
  }
}
