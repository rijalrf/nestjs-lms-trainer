import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRequestDTO } from './user.model';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly db: PrismaService) {}

  async create(request: UserRequestDTO): Promise<User> {
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
    return user;
  }

  async update(id: number, request: UserRequestDTO): Promise<User> {
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
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        id: id,
      },
    });
    return user;
  }

  async findAll(page: number = 1, limit: number): Promise<User[]> {
    const skip = (page - 1) * limit;
    const users: User[] = await this.db.user.findMany({
      take: limit,
      skip: skip,
    });
    return users;
  }

  async count(): Promise<number> {
    const count = await this.db.user.count();
    return count;
  }
}
