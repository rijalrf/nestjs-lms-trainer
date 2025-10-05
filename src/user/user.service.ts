import { Injectable } from '@nestjs/common';
import { UserRequestDTO, UserResponseDTO } from './user.model';
import { UserRepository } from './user.repo';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  register(user: UserRequestDTO) {
    const userDTO = this.userRepo.create(user);
    return userDTO;
  }
  update(user: UserRequestDTO) {
    const userDTO = this.userRepo.update(user);
    return userDTO;
  }

  findAll() {
    const users = this.userRepo.findAll();
    return users;
  }

  findByEmail(email: string) {
    const user = this.userRepo.findByEmail(email);
    return user;
  }

  findById(id: number) {
    const user = this.userRepo.findById(id);
    return user;
  }
}
