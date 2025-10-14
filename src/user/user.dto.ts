import { Pagination } from 'src/common/dto/pagination.dto';
import { UserEntity, UserRoleEnum } from './user.entity';

export class UserRequestDTO {
  name: string;
  email: string;
  password: string;
  divisi: string;
  position: string;
  role: UserRoleEnum;
}

export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  divisi: string;
  position: string;
  role: UserRoleEnum;

  constructor(user: UserEntity) {
    id: user.id;
    name: user.name;
    email: user.email;
    divisi: user.divisi;
    position: user.position;
    role: user.role;
  }

  static fromEntity(user: UserEntity): UserResponseDTO {
    return new UserResponseDTO(user);
  }

  static fromEntities(users: UserEntity[]): UserResponseDTO[] {
    return users.map(UserResponseDTO.fromEntity);
  }
}

export class UserResponseDTOwithPagination {
  data: UserResponseDTO[];
  pagination: Pagination;

  constructor(data: UserEntity[], pagination: Pagination) {
    this.data = data.map(UserResponseDTO.fromEntity);
    this.pagination = pagination;
  }

  static set(data: UserEntity[], pagination: Pagination) {
    return new UserResponseDTOwithPagination(data, pagination);
  }
}
