import { Injectable } from '@nestjs/common';
import { UserRequestDTO } from './user.model';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  register(user: UserRequestDTO) {
    try {
      const userDTO = this.userRepo.create(user);
      return userDTO;
    } catch (error) {
      console.error(error);
    }
  }
  update(id: number, user: UserRequestDTO) {
    try {
      const userDTO = this.userRepo.update(id, user);
      return userDTO;
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    try {
      const users = this.userRepo.findAll();
      return users;
    } catch (error) {
      console.error(error);
    }
  }

  findByEmail(email: string) {
    try {
      const user = this.userRepo.findByEmail(email);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  findById(id: number) {
    try {
      const user = this.userRepo.findById(id);
      return user;
    } catch (error) {
      console.error(error);
    }
  }
}
