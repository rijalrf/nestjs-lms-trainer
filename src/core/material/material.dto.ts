import { Material } from '@prisma/client';
import { Pagination } from 'src/common/dto/pagination.dto';

export class MaterialRequestDTO {
  title: string;
  description: string;
  topicId: number;
  fileUrl: string;
}

export class MaterialResponseDTO {
  id: number;
  title: string;
  description: string;
  topicId: number;
  fileUrl: string;

  constructor(material: Material) {
    this.id = material.id;
    this.title = material.title;
    this.description = material.description;
    this.topicId = material.topicId;
    this.fileUrl = material.fileUrl;
  }

  static fromEntity(material: Material) {
    return new MaterialResponseDTO(material);
  }

  static fromEntities(materials: Material[]): MaterialResponseDTO[] {
    return materials.map((material) =>
      MaterialResponseDTO.fromEntity(material),
    );
  }
}

export class MaterialResponseDTOwithPagination {
  data: MaterialResponseDTO[];
  pagination: Pagination;

  constructor(materials: Material[], pagination: Pagination) {
    this.data = materials.map((materials) =>
      MaterialResponseDTO.fromEntity(materials),
    );
    this.pagination = pagination;
  }

  static set(
    materials: Material[],
    pagination: Pagination,
  ): MaterialResponseDTOwithPagination {
    return new MaterialResponseDTOwithPagination(materials, pagination);
  }
}
