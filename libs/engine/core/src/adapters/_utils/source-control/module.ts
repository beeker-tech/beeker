import { Module } from '@nestjs/common';
import { SourceControlImpl } from './source-control';

@Module({
  providers: [SourceControlImpl],
  exports: [SourceControlImpl],
})
export class SourceControlModule {}
