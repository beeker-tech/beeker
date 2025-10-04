import { Module } from '@nestjs/common';
import { SchemaValidatorImpl } from './schema.validator';

@Module({
  providers: [SchemaValidatorImpl],
  exports: [SchemaValidatorImpl],
})
export class SchemaValidatorModule {}
