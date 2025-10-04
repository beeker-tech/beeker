import { UseCaseProxy } from '../_shared/use-case.proxy';
import { CleanWorkspaceUseCase } from '../../../application/engine/workspace';
import { WorkspaceManagerImpl } from '../../../adapters/infrastructure/workspace';

export const CLEAN_WORKSPACE_USECASE_PROXY = 'CleanWorkspaceUseCaseProxy';

export const CleanWorkspaceUseCaseProvider = {
  inject: [WorkspaceManagerImpl],
  provide: CLEAN_WORKSPACE_USECASE_PROXY,
  useFactory: (workspaceManagerImpl: WorkspaceManagerImpl) =>
    new UseCaseProxy(new CleanWorkspaceUseCase(workspaceManagerImpl)),
};
