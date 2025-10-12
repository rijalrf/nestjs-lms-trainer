export type MaterialEntity = {
  id?: number;
  title: string;
  description: string;
  topicId: number;
  fileUrl: string;
};
export type MaterialPopularEntity = {
  title: string;
  description: string;
  countAssignment: bigint;
};
