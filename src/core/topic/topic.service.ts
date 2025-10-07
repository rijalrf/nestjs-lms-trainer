import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TopicRepositoy } from './topic.repo';
import {
  TopicResponseDTO,
  TopicRequestDTO,
  TopicResponseDTOwithPagination,
} from './topic.dto';
import { Pagination } from 'src/common/dto/pagination.dto';

@Injectable()
export class TopicService {
  constructor(private readonly topicRepo: TopicRepositoy) {}

  async create(
    request: TopicRequestDTO,
    sessionUserId: number,
  ): Promise<TopicResponseDTO> {
    try {
      const topic = await this.topicRepo.create(request, sessionUserId);
      return TopicResponseDTO.fromEntity(topic);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(
    id: number,
    request: TopicRequestDTO,
    sessionUserId: number,
  ): Promise<TopicResponseDTO> {
    try {
      const topic = await this.topicRepo.update(id, request, sessionUserId);
      return TopicResponseDTO.fromEntity(topic);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.topicRepo.delete(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(
    title: string | '',
    page: number,
    limit: number,
  ): Promise<TopicResponseDTOwithPagination> {
    const skip = (page - 1) * limit;
    const totalItems = await this.topicRepo.count();
    const totalPages = Math.ceil(totalItems / limit);

    const pagination = new Pagination();
    pagination.currentPage = page;
    pagination.perPage = limit;
    pagination.totalItems = totalItems;
    pagination.totalPages = totalPages;
    try {
      const topics = await this.topicRepo.findAll(title, skip, limit);
      return TopicResponseDTOwithPagination.set(topics, pagination);
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: number): Promise<TopicResponseDTO> {
    try {
      const topic = await this.topicRepo.findById(id);
      if (!topic) {
        throw new HttpException('Topic not found', HttpStatus.NOT_FOUND);
      }
      return TopicResponseDTO.fromEntity(topic);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
