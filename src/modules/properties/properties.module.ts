import { Module } from '@nestjs/common';

import { PropertyModule } from './property/property.module';
import { RegionModule } from './region/region.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [PropertyModule, RegionModule, CategoryModule],
})
export class PropertiesModule {}
