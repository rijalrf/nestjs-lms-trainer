import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MaterialRequestDTO } from './material.dto';
import { Material } from '@prisma/client';

@Injectable()
export class MaterialRepository {
  constructor(private readonly db: PrismaService) {}

  async create(request: MaterialRequestDTO, userId: number): Promise<Material> {
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
    request: MaterialRequestDTO,
    userId: number,
  ): Promise<Material> {
    const material = await this.db.material.update({
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

  async findById(id: number): Promise<Material | null> {
    const material = await this.db.material.findUnique({
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
  ): Promise<Material[]> {
    const materials = await this.db.material.findMany({
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

  async count(topicId: number): Promise<number> {
    const count = await this.db.material.count({
      where: {
        topicId: topicId,
      },
    });

    return count;
  }
}
