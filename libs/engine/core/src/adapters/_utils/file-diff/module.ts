import { Module } from '@nestjs/common';
import { FileDiffImpl } from './file-diff';

@Module({
  providers: [FileDiffImpl],
  exports: [FileDiffImpl],
})
export class FileDiffModule {}
