import { User } from '@prisma/client';
import { UserResponseDTO } from 'src/user/user.dto';

export class LoginRequestDTO {
  email: string;
  password: string;
}

export class LoginResponseDTO {
  token: string;
  data: UserResponseDTO;

  constructor(user: User, token: string) {
    this.data = UserResponseDTO.fromEntity(user);
    this.token = token;
  }

  static set(user: User, token: string) {
    return new LoginResponseDTO(user, token);
  }
}

