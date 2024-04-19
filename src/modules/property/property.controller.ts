import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';

import { Pagination } from '@/utils/types';
import { PropertyService } from './property.service';
import { PaginationParams } from '@/utils/custom-decorator';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { UpdatePropertyDTO } from './dto/update-property.dto';

@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Post()
  createProperty(@Req() req, @Body() dto: CreatePropertyDTO) {
    return this.propertyService.createProperty(req.user.id, dto);
  }

  @Get()
  getAllProperties(@PaginationParams() paginationParams: Pagination) {
    return this.propertyService.findAllProperties(paginationParams);
  }

  @Get(':uuid')
  getPropertyById(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.propertyService.findPropertyById(id);
  }

  @Put(':uuid')
  updateProperty(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePropertyDTO,
  ) {
    return this.propertyService.updateProperty(id, dto);
  }

  @Delete(':uuid')
  deleteProperty(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.propertyService.deleteProperty(id);
  }
}
