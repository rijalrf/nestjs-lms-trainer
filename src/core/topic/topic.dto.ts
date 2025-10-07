import { Topic } from '@prisma/client';
import { Pagination } from 'src/common/dto/pagination.dto';
export class TopicRequestDTO {
  title: string;
  description: string;
}

export class TopicResponseDTO {
  id: number;
  title: string;
  description: string;

  constructor(topic: Topic) {
    this.id = topic.id;
    this.title = topic.title;
    this.description = topic.description;
  }

  static fromEntity(topic: Topic): TopicResponseDTO {
    return new TopicResponseDTO(topic);
  }

  static fromEntities(topics: Topic[]): TopicResponseDTO[] {
    return topics.map((topic) => TopicResponseDTO.fromEntity(topic));
  }
}

export class TopicResponseDTOwithPagination {
  data: TopicResponseDTO[];
  pagination: Pagination;

  constructor(data: Topic[], pagination: Pagination) {
    this.data = data.map(TopicResponseDTO.fromEntity);
    this.pagination = pagination;
  }

  static set(data: Topic[], pagination: Pagination) {
    return new TopicResponseDTOwithPagination(data, pagination);
  }
}
