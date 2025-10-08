import z from 'zod';

export class AssignmentValidation {
  static CREATEUPDATE = z.object({
    topicId: z.number().min(1),
    materialId: z.number().min(1),
    userId: z.number().min(1),
    trainingDate: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    maxParticipant: z.number().min(1),
    classRoomLink: z.string().min(1),
    status: z.string().min(1),
  });
}
