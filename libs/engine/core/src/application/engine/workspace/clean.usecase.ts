import { WorkspaceManager } from '../../../domain/engine/workspace';
import { CleanWorkspaceParam } from '@beeker-tech/engine-common';

export class CleanWorkspaceUseCase {
  constructor(private readonly workspaceManager: WorkspaceManager) {}

  async execute(param: CleanWorkspaceParam): Promise<void> {
    const { rootDir } = param;
    const GIT_CLEAN_OPTIONS = [
      '-e',
      '*.beek',
      '-e',
      '*.action.yml',
      '-f',
      '-d',
    ];
    const GIT_RESTORE_OPTIONS = [':!*.beek', ':!*.action.yml'];

    this.workspaceManager.clean(rootDir, ...GIT_CLEAN_OPTIONS);
    this.workspaceManager.restore(rootDir, ...GIT_RESTORE_OPTIONS);
  }
}
