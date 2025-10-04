import path from 'path';
import { pathExists, readdir, lstat } from 'fs-extra';

export const isRootDirectory = (directoryPath: string) => {
  const resolvedPath = path.resolve(directoryPath);

  return resolvedPath === path.parse(resolvedPath).root;
};

export const searchUpdwards = async (
  startPath: string,
  filter: string
): Promise<string | null> => {
  const regexp = new RegExp(filter);

  if (!pathExists(startPath)) {
    return null;
  }

  const files = await readdir(startPath);

  for (const file of files) {
    const filePath = path.join(startPath, file);
    const stat = await lstat(filePath);

    if (!stat.isDirectory() && regexp.test(filePath)) {
      return filePath;
    }
  }

  if (isRootDirectory(startPath)) return null;

  const parentPath = path.join(startPath, '..');

  return searchUpdwards(parentPath, filter);
};
