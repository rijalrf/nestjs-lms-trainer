import { Controller, Post, Get, Res, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRequestDTO, UserResponseDTO } from 'src/user/user.dto';
import { LoginRequestDTO, LoginResponseDTO } from './auth.dto';
import { Auth } from './auth.decorator';
import { Message } from 'src/common/decorator/message.decorator';
import type { Response } from 'express';
import { ZBody } from 'src/common/decorator/zod.decorator';
import { AuthValidation } from './auth.validation';

@Controller('/v1/api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  @Message('Success register')
  async register(@ZBody(AuthValidation.REGISTER) request: UserRequestDTO) {
    const data = await this.authService.register(request);
    return data;
  }

  @Post('/login')
  @Message('Success login')
  async login(
    @ZBody(AuthValidation.LOGIN) request: LoginRequestDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDTO> {
    const data = await this.authService.login(request);
    response.cookie('token', data.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return data;
  }

  @Delete('/logout')
  @Message('Success logout')
  async logout(
    @Auth() user: UserResponseDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.logout(user);
    response.clearCookie('token');
  }

  @Get('/profile')
  getProfile(@Auth() user: UserResponseDTO) {
    const data = this.authService.profile(user);
    return data;
  }
}
