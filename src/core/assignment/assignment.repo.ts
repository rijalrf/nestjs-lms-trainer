import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AssignmentRequestDTO, AssignmentResponseDTO } from './assignment.dto';
import { Assignment } from '@prisma/client';

@Injectable()
export class AssignmentReposity {
  constructor(private readonly db: PrismaService) {}

  async create(
    request: AssignmentRequestDTO,
    userId: number,
  ): Promise<AssignmentResponseDTO> {
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
      include: {
        topic: true,
        material: true,
        trainerUser: true,
      },
    });
    return AssignmentResponseDTO.fromEntity(
      assignment,
      assignment.trainerUser,
      assignment.topic,
      assignment.material,
    );
  }

  async update(
    id: number,
    request: AssignmentRequestDTO,
    userId: number,
  ): Promise<AssignmentResponseDTO> {
    const assignment = await this.db.assignment.update({
      where: { id },
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
        updatedBy: userId,
      },
      include: {
        topic: true,
        material: true,
        trainerUser: true,
      },
    });
    return AssignmentResponseDTO.fromEntity(
      assignment,
      assignment.trainerUser,
      assignment.topic,
      assignment.material,
    );
  }

  async getAll(skip: number, take: number): Promise<AssignmentResponseDTO[]> {
    const assignments = await this.db.assignment.findMany({
      skip,
      take,
      include: {
        topic: true,
        material: true,
        trainerUser: true,
      },
    });
    return assignments.map((assignment) => {
      return AssignmentResponseDTO.fromEntity(
        assignment,
        assignment.trainerUser,
        assignment.topic,
        assignment.material,
      );
    });
  }

  async getById(id: number): Promise<AssignmentResponseDTO | null> {
    const assignment = await this.db.assignment.findUnique({
      where: { id },
      include: {
        topic: true,
        material: true,
        trainerUser: true,
      },
    });
    if (assignment) {
      return AssignmentResponseDTO.fromEntity(
        assignment,
        assignment.trainerUser,
        assignment.topic,
        assignment.material,
      );
    }
    return null;
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
