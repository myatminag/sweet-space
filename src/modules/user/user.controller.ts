import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Put,
  Get,
} from '@nestjs/common';

import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':uuid')
  findUserById(@Param('uuid', ParseUUIDPipe) id: string) {
    return this.userService.findUserById(id);
  }

  @Put(':uuid')
  updateProfile(
    @Param('uuid', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDTO,
  ) {
    return this.userService.updateProfile(id, dto);
  }
}
