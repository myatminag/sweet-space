import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  createProperty() {
    return this.propertyService.create('A new property.');
  }

  @Get()
  getAllProperty() {
    try {
      return this.propertyService.findAll();
    } catch (e) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: e },
      );
    }
  }

  @Get(':id')
  getPropertyById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return `fetch property based on id ${typeof id}`;
  }

  @Put(':id')
  updateProperty() {}

  @Delete(':id')
  deleteProperty() {}
}
