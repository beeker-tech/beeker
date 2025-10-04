import { Module } from '@nestjs/common';
import { FileSearchImpl } from './file-search';
import { FileSystemModule } from '../file-system/module';

@Module({
  imports: [FileSystemModule],
  providers: [FileSearchImpl],
  exports: [FileSearchImpl],
})
export class FileSearchModule {}
