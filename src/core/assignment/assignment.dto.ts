import {
  Assignment,
  Material,
  StatusAssignment,
  Topic,
  User,
} from '@prisma/client';
import { toDateLocal, toTimeLocal } from 'src/common/datetime.helper';
import { Pagination } from 'src/common/dto/pagination.dto';
import { TopicResponseDTO } from '../topic/topic.dto';
import { MaterialResponseDTO } from '../material/material.dto';

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

export class UserTrainerResponseDTO {
  id: number;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
  static fromEntity(user: User) {
    return new UserTrainerResponseDTO(user);
  }
}

export class AssignmentResponseDTO {
  id: number;
  trainingDate: string;
  startTime: string;
  endTime: string;
  maxParticipant: number;
  classRoomLink: string;
  status: StatusAssignment;
  trainer: UserTrainerResponseDTO;
  topic: TopicResponseDTO;
  material: MaterialResponseDTO;

  constructor(
    assignment: Assignment,
    trainer: User,
    topic: Topic,
    material: Material,
  ) {
    this.id = assignment.id;
    this.trainingDate = toDateLocal(assignment.trainingDate);
    this.startTime = toTimeLocal(assignment.startTime);
    this.endTime = toTimeLocal(assignment.endTime);
    this.maxParticipant = assignment.maxParticipant;
    this.classRoomLink = assignment.classRoomLink;
    this.status = assignment.status;
    this.topic = TopicResponseDTO.fromEntity(topic);
    this.material = MaterialResponseDTO.fromEntity(material);
    this.trainer = UserTrainerResponseDTO.fromEntity(trainer);
  }
  static fromEntity(
    assignment: Assignment,
    trainer: User,
    topic: Topic,
    material: Material,
  ) {
    return new AssignmentResponseDTO(assignment, trainer, topic, material);
  }
  static fromEntities(
    assignments: Assignment[],
    trainer: User,
    topic: Topic,
    material: Material,
  ) {
    return assignments.map((assignment) =>
      AssignmentResponseDTO.fromEntity(assignment, trainer, topic, material),
    );
  }
}

export class AssignmentResponseWithPaginationDTO {
  data: AssignmentResponseDTO[];
  pagination: Pagination;

  constructor(data: AssignmentResponseDTO[], pagination: Pagination) {
    this.data = data;
    this.pagination = pagination;
  }
  static set(data: AssignmentResponseDTO[], pagination: Pagination) {
    return new AssignmentResponseWithPaginationDTO(data, pagination);
  }
}
