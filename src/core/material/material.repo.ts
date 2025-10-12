import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Material } from '@prisma/client';
import { MaterialEntity, MaterialPopularEntity } from './material.entity';
import { QUERY_FIND_MATERIAL_POPULARS } from './material.queries';

@Injectable()
export class MaterialRepository {
  constructor(private readonly db: PrismaService) {}

  async create(request: MaterialEntity, userId: number): Promise<Material> {
    const material = await this.db.material.create({
      data: {
        title: request.title,
        description: request.description,
        topicId: request.topicId,
        fileUrl: request.fileUrl,
        createdBy: userId,
      },
    });

    return material;
  }

  async update(
    id: number,
    request: MaterialEntity,
    userId: number,
  ): Promise<MaterialEntity> {
    const material = await this.db.material.update({
      select: {
        id: true,
        title: true,
        description: true,
        topicId: true,
        fileUrl: true,
      },
      where: {
        id: id,
      },
      data: {
        title: request.title,
        description: request.description,
        topicId: request.topicId,
        fileUrl: request.fileUrl,
        updatedBy: userId,
      },
    });

    return material;
  }

  async delete(id: number): Promise<void> {
    await this.db.material.delete({
      where: {
        id: id,
      },
    });
  }

  async findById(id: number): Promise<MaterialEntity | null> {
    const material = await this.db.material.findUnique({
      select: {
        id: true,
        title: true,
        description: true,
        topicId: true,
        fileUrl: true,
      },
      where: {
        id: id,
      },
    });

    return material;
  }

  async findAllByTopicId(
    title: string,
    topicId: number,
    skip: number,
    take: number,
  ): Promise<MaterialEntity[]> {
    const materials = await this.db.material.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        topicId: true,
        fileUrl: true,
      },
      where: {
        title: {
          contains: title,
        },
        topicId: topicId,
      },
      skip: skip,
      take: take,
      orderBy: {
        id: 'desc',
      },
    });

    return materials;
  }

  async countByTopic(topicId: number | undefined): Promise<number> {
    const count = await this.db.material.count({
      where: {
        topicId: topicId,
      },
    });

    return count;
  }

  async countAll(): Promise<number> {
    const count = await this.db.material.count();
    return count;
  }

  async findMaterialPopular(): Promise<MaterialPopularEntity[]> {
    const materials = await this.db.$queryRaw<MaterialPopularEntity[]>(
      QUERY_FIND_MATERIAL_POPULARS,
    );
    return materials;
  }
}
