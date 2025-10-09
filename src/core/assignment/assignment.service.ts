import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AssignmentReposity } from './assignment.repo';
import {
  AssignmentRequestDTO,
  AssignmentResponseDTO,
  AssignmentResponseWithPaginationDTO,
} from './assignment.dto';
import { toTimeOnly } from 'src/common/datetime.helper';
import { Pagination } from 'src/common/dto/pagination.dto';

@Injectable()
export class AssignmentService {
  constructor(private readonly assignmentRepo: AssignmentReposity) {}

  async create(
    request: AssignmentRequestDTO,
    userId: number,
  ): Promise<AssignmentResponseDTO> {
    request.startTime = toTimeOnly(request.startTime);
    request.endTime = toTimeOnly(request.endTime);
    try {
      const assignment = await this.assignmentRepo.create(request, userId);
      return assignment;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    request: AssignmentRequestDTO,
    userId: number,
  ): Promise<AssignmentResponseDTO> {
    request.startTime = toTimeOnly(request.startTime);
    request.endTime = toTimeOnly(request.endTime);
    try {
      const assignment = await this.assignmentRepo.update(id, request, userId);
      return assignment;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getAll(
    page: number,
    limit: number,
  ): Promise<AssignmentResponseWithPaginationDTO> {
    const skip = (page - 1) * limit;
    const take = limit;
    const count = await this.assignmentRepo.count();
    try {
      const assignments = await this.assignmentRepo.getAll(skip, take);
      return AssignmentResponseWithPaginationDTO.set(
        assignments,
        new Pagination(page, limit, count),
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getById(id: number): Promise<AssignmentResponseDTO> {
    try {
      const data = await this.assignmentRepo.getById(id);
      if (!data) {
        throw new HttpException('Assignment not found', HttpStatus.NOT_FOUND);
      }
      return data;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.assignmentRepo.delete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
