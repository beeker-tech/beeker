import { ActionSpec } from './action-spec.model';

export interface ActionSpecFileSystemRepository {
  getActionSpec(path: string, rootDir?: string): Promise<ActionSpec>;
  findActionsSpecs(paths: string[], rootDir?: string): Promise<ActionSpec[]>;
}
