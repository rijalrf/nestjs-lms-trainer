import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicRequestDTO } from './topic.dto';
import { Topic } from '@prisma/client';

@Injectable()
export class TopicRepositoy {
  constructor(private readonly db: PrismaService) {}

  async create(request: TopicRequestDTO, userId: number): Promise<Topic> {
    const topic = await this.db.topic.create({
      data: {
        title: request.title,
        description: request.description,
        createdBy: userId,
      },
    });
    return topic;
  }

  async update(
    id: number,
    request: TopicRequestDTO,
    userId: number,
  ): Promise<Topic> {
    const topic = await this.db.topic.update({
      data: {
        title: request.title,
        description: request.description,
        updatedBy: userId,
      },
      where: {
        id: id,
      },
    });
    return topic;
  }

  async delete(id: number): Promise<void> {
    await this.db.topic.delete({
      where: {
        id: id,
      },
    });
  }

  async findById(id: number): Promise<Topic | null> {
    const topic = await this.db.topic.findUnique({
      where: {
        id: id,
      },
    });
    return topic;
  }

  async findAll(title: string, skip: number, take: number): Promise<Topic[]> {
    const topics = await this.db.topic.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      orderBy: {
        id: 'desc',
      },
      skip: skip,
      take: take,
    });
    return topics;
  }

  async count(): Promise<number> {
    const count = await this.db.topic.count();
    return count;
  }
}
