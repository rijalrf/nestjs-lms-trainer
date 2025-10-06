// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequestDTO, UserResponseDTO } from 'src/user/user.model';
import { LoginRequestDTO, LoginResponseDTO } from './dto/auth.dto';
import { Auth } from './auth.decorator';
import { SuccessResponseInterceptor } from 'src/common/success-response/success-response.interceptor';
import { Message } from 'src/common/decorator/message.decorator';

UseInterceptors(SuccessResponseInterceptor);
@Controller('/v1/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @Message('Success register')
  async register(@Body() request: UserRequestDTO) {
    const data = await this.authService.register(request);
    return data;
  }
  @Post('/login')
  @Message('Success login')
  async login(@Body() request: LoginRequestDTO): Promise<LoginResponseDTO> {
    const data = await this.authService.login(request);
    return data;
  }

  @Get('/profile')
  getProfile(@Auth() user: UserResponseDTO) {
    const data = this.authService.profile(user);
    return data;
  }
}
