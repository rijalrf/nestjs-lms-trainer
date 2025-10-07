import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}
  transform(value: any, _metadata: ArgumentMetadata) {
    console.log('data request ', value);
    return this.schema.parse(value);
  }
}
