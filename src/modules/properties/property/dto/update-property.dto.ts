import { PartialType } from '@nestjs/swagger';

import { CreatePropertyDTO } from './create-property.dto';

export class UpdatePropertyDTO extends PartialType(CreatePropertyDTO) {}
