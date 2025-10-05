import { Role, User } from '@prisma/client';

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
}
