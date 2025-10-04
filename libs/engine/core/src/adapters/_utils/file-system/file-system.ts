import { FileSystem } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import {
  pathExists,
  readFile,
  outputFile,
  move,
  remove,
  readdir,
  lstat,
  StatsBase,
} from 'fs-extra';

@Injectable()
export class FileSystemImpl implements FileSystem {
  async pathExists(path: string): Promise<boolean> {
    return pathExists(path);
  }

  async readFile(path: string): Promise<string> {
    return readFile(path, { encoding: 'utf-8' });
  }

  async outputFile(
    path: string,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    return outputFile(path, data);
  }

  async move(oldPath: string, newPath: string): Promise<void> {
    return move(oldPath, newPath);
  }

  async remove(path: string): Promise<void> {
    return remove(path);
  }

  async readdir(path: string): Promise<string[]> {
    return readdir(path, { encoding: 'utf-8' });
  }

  async lstat(path: string): Promise<StatsBase<number>> {
    return lstat(path);
  }
}
