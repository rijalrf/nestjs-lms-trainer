import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignmentRequestDTO } from './assignment.dto';
import { Assignment } from '@prisma/client';

@Injectable()
export class AssignmentReposity {
  constructor(private readonly db: PrismaService) {}

  async create(
    request: AssignmentRequestDTO,
    userId: number,
  ): Promise<Assignment> {
    const assignment = await this.db.assignment.create({
      data: {
        topicId: request.topicId,
        materialId: request.materialId,
        userId: request.userId,

        trainingDate: new Date(request.trainingDate),
        startTime: new Date(request.startTime),
        endTime: new Date(request.endTime),

        maxParticipant: request.maxParticipant,
        classRoomLink: request.classRoomLink,
        status: request.status,
        createdBy: userId,
      },
    });
    return assignment;
  }

  async update(
    id: number,
    request: AssignmentRequestDTO,
    userId: number,
  ): Promise<Assignment> {
    const assignment = await this.db.assignment.update({
      where: { id },
      data: {
        topicId: request.topicId,
        materialId: request.materialId,
        userId: request.userId,
        trainingDate: new Date(request.trainingDate),
        startTime: request.startTime,
        endTime: request.endTime,
        maxParticipant: request.maxParticipant,
        classRoomLink: request.classRoomLink,
        status: request.status,
        updatedBy: userId,
      },
    });
    return assignment;
  }

  async getAll(skip: number, take: number): Promise<Assignment[]> {
    const assignments = await this.db.assignment.findMany({
      skip,
      take,
    });
    return assignments;
  }

  async getById(id: number): Promise<Assignment | null> {
    const assignment = await this.db.assignment.findUnique({ where: { id } });
    return assignment;
  }

  async delete(id: number): Promise<Assignment> {
    const assignment = await this.db.assignment.delete({ where: { id } });
    return assignment;
  }

  async count(): Promise<number> {
    const count = await this.db.assignment.count();
    return count;
  }
}
