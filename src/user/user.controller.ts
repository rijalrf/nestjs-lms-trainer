import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRequestDTO } from './user.model';

@Controller('/v1/api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  register(user: UserRequestDTO) {
    return this.userService.register(user);
  }

  @Post('/update')
  update(user: UserRequestDTO) {
    return this.userService.update(user);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
}
