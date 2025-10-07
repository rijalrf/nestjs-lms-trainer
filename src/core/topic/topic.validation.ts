import z from 'zod';

export class TopicValidation {
  static CREATEUPDATE = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(3).max(100),
  });
}
