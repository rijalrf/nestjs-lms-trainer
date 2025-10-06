import z from 'zod';

export class AuthValidation {
  static readonly REGISTER = z.object({
    name: z.string().min(3).max(50),
    email: z.email(),
    password: z.string().min(8),
    divisi: z.string().min(3).max(50),
    position: z.string().min(3).max(50),
    roles: z.enum(['ADMIN', 'USER']),
  });

  static readonly LOGIN = z.object({
    email: z.email(),
    password: z.string().min(8),
  });
}
