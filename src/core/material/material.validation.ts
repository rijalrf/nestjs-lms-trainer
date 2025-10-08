import z from 'zod';

export class MaterialValidation {
  static CREATEUPDATE = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    topicId: z.number().min(1, 'Topic ID is required'),
    fileUrl: z.url('Invalid URL format').min(1, 'File URL is required'),
  });
}
