import { Module } from '@nestjs/common';
import { FileSystemImpl } from './file-system';

@Module({
  providers: [FileSystemImpl],
  exports: [FileSystemImpl],
})
export class FileSystemModule {}
