export type MaterialEntity = {
  id?: number;
  title: string;
  description: string;
  topicId: number;
  fileUrl: string;
};

export const materialSelects = {
  id: true,
  title: true,
  description: true,
  topicId: true,
  fileUrl: true,
};
