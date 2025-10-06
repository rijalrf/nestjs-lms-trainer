import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashService } from 'src/helper/hash/hash.service';
import { UserService } from 'src/user/user.service';
import { LoginResponseDTO } from './dto/auth.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  async login(email: string, password: string): Promise<LoginResponseDTO> {
    try {
      const user = await this.userService.findAuthByEmail(email);
      if (!user) {
        throw new HttpException(
          'email or password is wrong',
          HttpStatus.NOT_FOUND,
        );
      }

      const passwordMatch = await this.hashService.comparePassword(
        password,
        user.password,
      );
      console.log({ passwordMatch });
      if (!passwordMatch) {
        throw new UnauthorizedException('email or password is wrong');
      }

      const token = uuid();
      await this.userService.setUserToken(user.id, token);

      return LoginResponseDTO.set(user, '123456');
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
