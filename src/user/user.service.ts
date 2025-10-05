import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  UserRequestDTO,
  UserResponseDTO,
  UserResponseDTOwithPagination,
} from './user.model';
import { UserRepository } from './user.repo';
import { Pagination } from 'src/common/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async register(request: UserRequestDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepo.create(request);
      return UserResponseDTO.fromEntity(user);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, request: UserRequestDTO): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepo.update(id, request);
      return UserResponseDTO.fromEntity(user);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<UserResponseDTOwithPagination> {
    const totalItems = await this.userRepo.count();
    const totalPages = Math.ceil(totalItems / limit);

    const pagination = new Pagination();
    pagination.currentPage = page;
    pagination.perPage = limit;
    pagination.totalItems = totalItems;
    pagination.totalPages = totalPages;

    try {
      const users = await this.userRepo.findAll(page, limit);
      return UserResponseDTOwithPagination.set(users, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepo.findByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return UserResponseDTO.fromEntity(user);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number): Promise<UserResponseDTO> {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return UserResponseDTO.fromEntity(user);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
