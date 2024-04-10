import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './entities/property.entity';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { UpdatePropertyDTO } from './dto/update-property.dto';
import { Pagination } from 'src/utils/types';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async createProperty(dto: CreatePropertyDTO) {
    const property = await this.propertyRepository.save({ ...dto });

    return { ...property };
  }

  async findAllProperties({ page, limit, size, offset }: Pagination) {
    const [property, total] = await this.propertyRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    return {
      page,
      size,
      total_items: total,
      items: property,
    };
  }

  async findPropertyById(id: string) {
    const property = await this.propertyRepository.findOneBy({ id });

    if (!property) {
      throw new NotFoundException('Property not found!');
    }

    return { ...property };
  }

  async updateProperty(id: string, dto: UpdatePropertyDTO) {
    const property = await this.findPropertyById(id);

    if (!property) {
      throw new NotFoundException('Property not found!');
    }

    const { images, ...updatedData } = dto;

    property.images = images;

    Object.assign(property, updatedData);

    const updatedProperty = await this.propertyRepository.save(property);

    return { ...updatedProperty };
  }

  async deleteProperty(id: string) {
    const property = await this.findPropertyById(id);

    if (!property) {
      throw new NotFoundException('Property not found!');
    }

    return await this.propertyRepository.remove(property);
  }
}
