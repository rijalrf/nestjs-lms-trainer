export type TopicEntity = {
  id?: number;
  title: string;
  description: string;
};

export type TopicPopularEntity = {
  title: string;
  description: string;
  countAssignment: bigint;
};
