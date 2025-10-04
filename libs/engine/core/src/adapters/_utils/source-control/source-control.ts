import { SourceControl } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import { simpleGit, SimpleGit } from 'simple-git';

const GIT_CLEAN_COMMAND = 'clean';
const GIT_RESTORE_COMMAND = 'restore';

@Injectable()
export class SourceControlImpl implements SourceControl {
  async clean(baseDir: string, ...pathspecs: string[]): Promise<string> {
    const git: SimpleGit = simpleGit(baseDir);

    return git.raw(GIT_CLEAN_COMMAND, ...pathspecs);
  }

  async restore(baseDir?: string, ...pathspecs: string[]): Promise<string> {
    const git: SimpleGit = simpleGit(baseDir);

    return git.raw(GIT_RESTORE_COMMAND, ...pathspecs);
  }
}
