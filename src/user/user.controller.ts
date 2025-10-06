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
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  UserRequestDTO,
  UserResponseDTO,
  UserResponseDTOwithPagination,
} from './user.dto';
import { Message } from 'src/common/decorator/message.decorator';
import { UserValidation } from './user.validation';
import { ErrorResponseFilter } from 'src/common/error-response.filter';
import { ZBody } from 'src/common/decorator/zod.decorator';

@UseFilters(ErrorResponseFilter)
@Controller('/v1/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(
    @ZBody(UserValidation.CREATEUPDATE) user: UserRequestDTO,
  ): Promise<UserResponseDTO> {
    const data = await this.userService.register(user);
    return data;
  }

  @Put('/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @ZBody(UserValidation.CREATEUPDATE) user: UserRequestDTO,
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
