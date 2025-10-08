import { Assignment } from '@prisma/client';
import { StatusAssignment } from 'generated/prisma';
import { toDateLocal, toTimeLocal } from 'src/common/datetime.helper';
import { Pagination } from 'src/common/dto/pagination.dto';

export class AssignmentRequestDTO {
  topicId: number;
  materialId: number;
  userId: number;
  trainingDate: string;
  startTime: string;
  endTime: string;
  maxParticipant: number;
  classRoomLink: string;
  status: StatusAssignment;
}

export class AssignmentResponseDTO {
  id: number;
  topicId: number;
  materialId: number;
  userId: number;
  trainingDate: string;
  startTime: string;
  endTime: string;
  maxParticipant: number;
  classRoomLink: string;
  status: StatusAssignment;

  constructor(assignment: Assignment) {
    this.id = assignment.id;
    this.topicId = assignment.topicId;
    this.materialId = assignment.materialId;
    this.userId = assignment.userId;
    this.trainingDate = toDateLocal(assignment.trainingDate);
    this.startTime = toTimeLocal(assignment.startTime);
    this.endTime = toTimeLocal(assignment.endTime);
    this.maxParticipant = assignment.maxParticipant;
    this.classRoomLink = assignment.classRoomLink;
    this.status = assignment.status;
  }
  static fromEntity(assignment: Assignment) {
    return new AssignmentResponseDTO(assignment);
  }
  static fromEntities(assignments: Assignment[]) {
    return assignments.map((assignment) =>
      AssignmentResponseDTO.fromEntity(assignment),
    );
  }
}

export class AssignmentResponseWithPaginationDTO {
  data: AssignmentResponseDTO[];
  pagination: Pagination;

  constructor(data: Assignment[], pagination: Pagination) {
    this.data = AssignmentResponseDTO.fromEntities(data);
    this.pagination = pagination;
  }
  static set(data: Assignment[], pagination: Pagination) {
    return new AssignmentResponseWithPaginationDTO(data, pagination);
  }
}
