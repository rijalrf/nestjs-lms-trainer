import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from 'src/helper/hash/hash.service';
import { UserService } from 'src/user/user.service';
import { LoginRequestDTO, LoginResponseDTO } from './dto/auth.dto';
import { v4 as uuid } from 'uuid';
import { UserRequestDTO, UserResponseDTO } from 'src/user/user.model';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async login(request: LoginRequestDTO): Promise<LoginResponseDTO> {
    try {
      const user = await this.userService.findAuthByEmail(request.email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const isPasswordValid = await this.hashService.comparePassword(
        request.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
      }
      const token = uuid();
      await this.userService.setUserToken(user.id, token);
      return LoginResponseDTO.set(user, token);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async register(request: UserRequestDTO): Promise<UserResponseDTO> {
    const hashPassword = await this.hashService.hashPassword(request.password);
    request.password = hashPassword;
    try {
      const user = await this.userService.register(request);
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async profile(user: UserResponseDTO): Promise<UserResponseDTO> {
    return user;
  }
}
