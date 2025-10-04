export interface FileSystem {
  pathExists(path: string): Promise<boolean>;
  readFile(path: string): Promise<string>;
  outputFile(
    path: string,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void>;
  move(oldPath: string, newPath: string): Promise<void>;
  remove(path: string): Promise<void>;
  readdir(path: string): Promise<string[]>;
  lstat(path: string): Promise<unknown>;
}
