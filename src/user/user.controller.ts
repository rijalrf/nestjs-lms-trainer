import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO } from './user.model';
import { ApiSuccessResponse } from 'src/common/dto/success-response.dto';
import { SuccessResponseInterceptor } from 'src/common/success-response/success-response.interceptor';
import { Pagination } from 'src/common/dto/pagination.dto';

@UseInterceptors(SuccessResponseInterceptor)
@Controller('/v1/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() user: UserRequestDTO) {
    const data = await this.userService.register(user);
    return data;
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserRequestDTO,
  ) {
    const data = await this.userService.update(id, user);
    return data;
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const data = await this.userService.findAll(page, limit);
    return data;
  }

  @Get('/:id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findById(id);
    return data;
  }
}
