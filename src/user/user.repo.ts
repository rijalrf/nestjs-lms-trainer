import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestDTO, UserResponseDTO } from './user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaService) {}

  async create(userModel: UserRequestDTO): Promise<UserResponseDTO> {
    const user = await this.db.user.create({
      data: {
        name: userModel.name,
        email: userModel.email,
        password: userModel.password,
        divisi: userModel.divisi,
        position: userModel.position,
        role: userModel.roles,
      },
    });
    return new UserResponseDTO(user);
  }

  async update(userModel: UserRequestDTO): Promise<UserResponseDTO> {
    const user = await this.db.user.update({
      where: {
        id: userModel.id,
      },
      data: {
        name: userModel.name,
        email: userModel.email,
        password: userModel.password,
        divisi: userModel.divisi,
        position: userModel.position,
        role: userModel.roles,
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
