import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO } from './user.model';

@Controller('/v1/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  register(@Body() user: UserRequestDTO) {
    return this.userService.register(user);
  }

  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() user: UserRequestDTO) {
    return this.userService.update(id, user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }
}
