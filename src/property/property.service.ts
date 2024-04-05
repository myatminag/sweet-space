import { Injectable } from '@nestjs/common';

@Injectable()
export class PropertyService {
  private readonly properties = [];

  create(property) {
    this.properties.push(property);
    return this.properties;
  }

  findAll() {
    return this.properties;
  }
}
