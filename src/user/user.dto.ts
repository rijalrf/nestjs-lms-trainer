import { Role, User } from '@prisma/client';
import { Pagination } from 'src/common/dto/pagination.dto';

export class UserRequestDTO {
  name: string;
  email: string;
  password: string;
  divisi: string;
  position: string;
  roles: Role;
}

export class UserResponseDTO {
  id: number;
  name: string;
  email: string;
  divisi: string;
  position: string;
  roles: Role;

  constructor(user: User | null) {
    if (user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.divisi = user.divisi;
      this.position = user.position;
      this.roles = user.role;
    }
  }

  static fromEntity(user: User): UserResponseDTO {
    return new UserResponseDTO(user);
  }

  static fromEntities(users: User[]): UserResponseDTO[] {
    return users.map(UserResponseDTO.fromEntity);
  }
}

export class UserResponseDTOwithPagination {
  data: UserResponseDTO[];
  pagination: Pagination;

  constructor(data: User[], pagination: Pagination) {
    this.data = data.map(UserResponseDTO.fromEntity);
    this.pagination = pagination;
  }

  static set(data: User[], pagination: Pagination) {
    return new UserResponseDTOwithPagination(data, pagination);
  }
}
