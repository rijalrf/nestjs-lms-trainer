import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MaterialRepository } from './material.repo';
import {
  MaterialRequestDTO,
  MaterialResponseDTO,
  MaterialResponseDTOwithPagination,
} from './material.dto';
import { Pagination } from 'src/common/dto/pagination.dto';
import { TopicRepositoy } from '../topic/topic.repo';

@Injectable()
export class MaterialService {
  constructor(
    private readonly materialRepo: MaterialRepository,
    private readonly topic: TopicRepositoy,
  ) {}

  async create(
    request: MaterialRequestDTO,
    userId: number,
  ): Promise<MaterialResponseDTO> {
    try {
      const topic = await this.topic.findById(request.topicId);
      if (!topic) {
        throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
      }
      const data = await this.materialRepo.create(request, userId);
      return MaterialResponseDTO.fromEntity(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    request: MaterialRequestDTO,
    userId: number,
  ): Promise<MaterialResponseDTO> {
    try {
      const data = await this.materialRepo.update(id, request, userId);
      return MaterialResponseDTO.fromEntity(data);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.materialRepo.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number): Promise<MaterialResponseDTO> {
    try {
      const data = await this.materialRepo.findById(id);
      if (!data) {
        throw new HttpException('Material not found', HttpStatus.NOT_FOUND);
      }
      return MaterialResponseDTO.fromEntity(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllByTopicId(
    title: string,
    topicId: number,
    page: number,
    limit: number,
  ): Promise<MaterialResponseDTOwithPagination> {
    try {
      const skip = (page - 1) * limit;
      const take = limit;
      const totalItems = await this.materialRepo.count(topicId);
      const pagination = new Pagination(page, limit, totalItems);
      const data = await this.materialRepo.findAllByTopicId(
        title,
        topicId,
        skip,
        take,
      );
      return MaterialResponseDTOwithPagination.set(data, pagination);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
