import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserRequestDTO,
  UserResponseDTO,
  UserResponseDTOwithPagination,
} from './user.model';
import { SuccessResponseInterceptor } from 'src/common/success-response/success-response.interceptor';
import { Message } from 'src/common/decorator/message.decorator';
import { UserValidation } from './user.validation';
import { ErrorFilterFilter } from 'src/common/error-filter/error-filter.filter';
import { ZBody } from 'src/common/decorator/zod.decorator';

@UseFilters(ErrorFilterFilter)
@UseInterceptors(SuccessResponseInterceptor)
@Controller('/v1/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @ZBody(UserValidation.REGISTER) user: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    const data = await this.userService.register(user);
    return data;
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    const data = await this.userService.update(id, user);
    return data;
  }

  @Get()
  @Message('Success retrival users')
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ): Promise<UserResponseDTOwithPagination> {
    const data = await this.userService.findAll(page, limit);
    return data;
  }

  @Get('/:id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponseDTO> {
    const data = await this.userService.findById(id);
    return data;
  }
}
