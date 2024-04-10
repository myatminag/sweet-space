import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';

import { PropertyService } from './property.service';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { UpdatePropertyDTO } from './dto/update-property.dto';
import { PaginationParams } from 'src/utils/custom-decorator';
import { Pagination } from 'src/utils/types';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  createProperty(@Body() dto: CreatePropertyDTO) {
    return this.propertyService.createProperty(dto);
  }

  @Get()
  getAllProperties(@PaginationParams() paginationParams: Pagination) {
    return this.propertyService.findAllProperties(paginationParams);
  }

  @Get(':uuid')
  getPropertyById(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.propertyService.findPropertyById(id);
  }

  @Put(':uuid')
  updateProperty(
    @Param('uuid', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePropertyDTO,
  ) {
    return this.propertyService.updateProperty(id, dto);
  }

  @Delete(':uuid')
  deleteProperty(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.propertyService.deleteProperty(id);
  }
}
