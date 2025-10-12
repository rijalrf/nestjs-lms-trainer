import { Pagination } from 'src/common/dto/pagination.dto';
import { MaterialEntity, MaterialPopularEntity } from './material.entity';

export class MaterialRequestDTO {
  title: string;
  description: string;
  topicId: number;
  fileUrl: string;
}

export class MaterialResponseDTO {
  id?: number;
  title: string;
  description: string;
  topicId: number;
  fileUrl: string;

  constructor(material: MaterialEntity) {
    this.id = material.id;
    this.title = material.title;
    this.description = material.description;
    this.topicId = material.topicId;
    this.fileUrl = material.fileUrl;
  }

  static fromEntity(material: MaterialEntity): MaterialResponseDTO {
    return new MaterialResponseDTO(material);
  }

  static fromEntities(materials: MaterialEntity[]): MaterialResponseDTO[] {
    return materials.map((material) =>
      MaterialResponseDTO.fromEntity(material),
    );
  }
}

export class MaterialResponseDTOwithPagination {
  data: MaterialResponseDTO[];
  pagination: Pagination;

  constructor(materials: MaterialEntity[], pagination: Pagination) {
    this.data = materials.map((materials) =>
      MaterialResponseDTO.fromEntity(materials),
    );
    this.pagination = pagination;
  }

  static set(
    materials: MaterialEntity[],
    pagination: Pagination,
  ): MaterialResponseDTOwithPagination {
    return new MaterialResponseDTOwithPagination(materials, pagination);
  }
}

export class MaterialsPopularResponseDTO {
  title: string;
  description: string;
  countAssignment: number;

  constructor(data: MaterialPopularEntity) {
    this.title = data.title;
    this.description = data.description;
    this.countAssignment = Number(data.countAssignment);
  }
  static set(data: MaterialPopularEntity[]) {
    return data.map((item) => new MaterialsPopularResponseDTO(item));
  }
}
