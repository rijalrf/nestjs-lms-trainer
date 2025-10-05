import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestDTO, UserResponseDTO } from './user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaService) {}

  async create(request: UserRequestDTO): Promise<UserResponseDTO> {
    const user = await this.db.user.create({
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
        divisi: request.divisi,
        position: request.position,
        role: request.roles,
      },
    });
    return new UserResponseDTO(user);
  }

  async update(id: number, request: UserRequestDTO): Promise<UserResponseDTO> {
    const user = await this.db.user.update({
      where: {
        id: id,
      },
      data: {
        name: request.name,
        email: request.email,
        password: request.password,
        divisi: request.divisi,
        position: request.position,
        role: request.roles,
      },
    });
    return new UserResponseDTO(user);
  }

  async findByEmail(email: string): Promise<UserResponseDTO> {
    const user = await this.db.user.findUnique({
      where: {
        email: email,
      },
    });
    return new UserResponseDTO(user);
  }

  async findById(id: number): Promise<UserResponseDTO> {
    const user = await this.db.user.findUnique({
      where: {
        id: id,
      },
    });
    return new UserResponseDTO(user);
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users: User[] = await this.db.user.findMany();
    return users.map((user) => new UserResponseDTO(user));
  }
}
