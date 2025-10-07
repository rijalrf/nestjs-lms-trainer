import z from 'zod';

export class UserValidation {
  static readonly CREATEUPDATE = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().optional(),
    divisi: z.string().min(2).max(50),
    position: z.string().min(3).max(50),
    roles: z.enum(['ADMIN', 'USER']),
  });
}
