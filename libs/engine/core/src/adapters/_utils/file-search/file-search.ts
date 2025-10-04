import path from 'path';
import { FileSearch } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import { LoggerImpl } from '../logger';
import { FileSystemImpl } from '../file-system';

@Injectable()
export class FileSearchImpl implements FileSearch {
  constructor(
    private readonly fileSystem: FileSystemImpl,
    private readonly logger: LoggerImpl
  ) {}

  async searchDownwards(
    startPath: string,
    filter: string
  ): Promise<string[] | null> {
    this.logger.verbose(
      'FileSearchImpl',
      `searching '${filter}' from dir ${startPath}`
    );
    const regexp = new RegExp(filter);
    const results: string[] = [];

    if (!this.fileSystem.pathExists(startPath)) {
      this.logger.verbose('FileSearchImpl', `directory ${startPath} not found`);

      return null;
    }

    const files = await this.fileSystem.readdir(startPath);

    for (const file of files) {
      const filePath = path.join(startPath, file);
      const stat = await this.fileSystem.lstat(filePath);

      if (stat.isDirectory()) {
        const subFolderResults = await this.searchDownwards(filePath, filter);

        if (subFolderResults) {
          results.push(...subFolderResults);
        }
      } else if (regexp.test(filePath)) {
        results.push(filePath);

        this.logger.verbose('FileSearchImpl', `found file ${filePath}`);
      }
    }

    return results;
  }
}
