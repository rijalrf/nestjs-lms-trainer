import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserResponseDTO } from 'src/user/user.model';
import { AuthService } from './auth.service';
import { LoginRequestDTO, LoginResponseDTO } from './dto/auth.dto';
import { SuccessResponseInterceptor } from 'src/common/success-response/success-response.interceptor';
import { Message } from 'src/common/decorator/message.decorator';

@UseInterceptors(SuccessResponseInterceptor)
@Controller('/v1/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @Message('Success login')
  async login(@Body() request: LoginRequestDTO): Promise<LoginResponseDTO> {
    const data = await this.authService.login(request.email, request.password);
    return data;
  }
}
