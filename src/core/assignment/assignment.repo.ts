import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AssignmentEntity,
  AssignmentFullEntity,
  AssignmentStatusEnum,
  querySelects,
} from './assignment.entity';
import {
  QUERY_FIND_TOP_TRAINERS,
  QueryFindTopTrainers,
} from './assignment.queries';

@Injectable()
export class AssignmentReposity {
  constructor(private readonly db: PrismaService) {}

  async create(
    request: AssignmentEntity,
    userId: number,
  ): Promise<AssignmentFullEntity> {
    const newData = {
      ...request,
      createdBy: userId,
    };
    const data = await this.db.assignment.create({
      data: newData,
      include: {
        topic: { select: querySelects.topic },
        material: { select: querySelects.material },
        trainerUser: { select: querySelects.trainer },
      },
    });
    return data;
  }

  async update(
    id: number,
    request: AssignmentEntity,
    userId: number,
  ): Promise<AssignmentFullEntity> {
    const updateData = {
      ...request,
      updatedBy: userId,
    };
    const data = await this.db.assignment.update({
      where: { id },
      data: updateData,
      include: {
        topic: { select: querySelects.topic },
        material: { select: querySelects.material },
        trainerUser: { select: querySelects.trainer },
      },
    });
    return data;
  }

  async updateStatus(
    id: number,
    status: AssignmentStatusEnum,
    userId: number,
  ): Promise<AssignmentFullEntity> {
    const assignment = await this.db.assignment.update({
      where: { id },
      data: {
        status: status,
        updatedBy: userId,
      },
      include: {
        topic: { select: querySelects.topic },
        material: { select: querySelects.material },
        trainerUser: { select: querySelects.trainer },
      },
    });
    return assignment;
  }

  async getAll(
    skip: number,
    take: number,
    status: AssignmentStatusEnum,
  ): Promise<AssignmentFullEntity[]> {
    const data = await this.db.assignment.findMany({
      skip,
      take,
      where: {
        status: status,
      },
      include: {
        topic: { select: querySelects.topic },
        material: { select: querySelects.material },
        trainerUser: { select: querySelects.trainer },
      },
    });
    return data;
  }

  async getById(id: number): Promise<AssignmentFullEntity | null> {
    const data = await this.db.assignment.findUnique({
      where: { id },
      include: {
        topic: { select: querySelects.topic },
        material: { select: querySelects.material },
        trainerUser: { select: querySelects.trainer },
      },
    });
    return data;
  }

  async delete(id: number): Promise<void> {
    await this.db.assignment.delete({ where: { id } });
  }

  async count(): Promise<number> {
    const count = await this.db.assignment.count();
    return count;
  }

  async countByStatus(status: AssignmentStatusEnum): Promise<number> {
    console.log({status});
    const count = await this.db.assignment.count({
      where: {
        status : status,
      },
    });
    return count;
  }

  async topTrainer(): Promise<QueryFindTopTrainers[]> {
    const result = await this.db.$queryRaw<QueryFindTopTrainers[]>(
      QUERY_FIND_TOP_TRAINERS,
    );
    return result;
  }
}
