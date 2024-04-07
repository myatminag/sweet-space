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
  Body,
} from '@nestjs/common';

import { PropertyService } from './property.service';
import { CreatePropertyDTO } from './dto/create-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  createProperty(@Body() createPropertyDTO: CreatePropertyDTO) {
    const results = this.propertyService.create(createPropertyDTO);
    return results;
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
