import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class HashService {
  constructor() {}

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const planPassword = await bcrypt.compare(password, hash);
    return planPassword;
  }
}
