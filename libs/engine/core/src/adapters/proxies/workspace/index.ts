import {
  CLEAN_WORKSPACE_USECASE_PROXY,
  CleanWorkspaceUseCaseProvider,
} from './clean.proxy';

export const WorkspaceProviders = [CleanWorkspaceUseCaseProvider];
export const WORKSPACE_PROXIES = [CLEAN_WORKSPACE_USECASE_PROXY];

export { CLEAN_WORKSPACE_USECASE_PROXY };
