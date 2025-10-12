import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TopicEntity, TopicPopularEntity } from './topic.entity';
import { QUERY_FIND_TOPIC_POPULARS } from './topic.queries';

@Injectable()
export class TopicRepositoy {
  constructor(private readonly db: PrismaService) {}

  /**
   * Creates a new topic.
   * @param request The topic data.
   * @param userId The ID of the user creating the topic.
   * @returns The created topic.
   */
  async create(request: TopicEntity, userId: number): Promise<TopicEntity> {
    const topic = await this.db.topic.create({
      select: {
        id: true,
        title: true,
        description: true,
      },
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
    request: TopicEntity,
    userId: number,
  ): Promise<TopicEntity> {
    const topic = await this.db.topic.update({
      select: {
        id: true,
        title: true,
        description: true,
      },
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

  async findById(id: number): Promise<TopicEntity | null> {
    const topic = await this.db.topic.findUnique({
      select: {
        id: true,
        title: true,
        description: true,
      },
      where: {
        id: id,
      },
    });
    return topic;
  }

  async findAll(
    title: string,
    skip: number,
    take: number,
  ): Promise<TopicEntity[]> {
    const topics = await this.db.topic.findMany({
      select: {
        id: true,
        title: true,
        description: true,
      },
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

  async findTopicPopular(): Promise<TopicPopularEntity[]> {
    const topics = await this.db.$queryRaw<TopicPopularEntity[]>(
      QUERY_FIND_TOPIC_POPULARS,
    );
    return topics;
  }
}
