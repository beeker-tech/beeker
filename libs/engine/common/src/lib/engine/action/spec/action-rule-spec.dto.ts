import { ActionRuleContextFileConfig } from '../config';

export interface ActionRuleSpec {
  // technical
  configPath: string | null;

  // content
  name: string;
  targetFilePath: string;
  contextFiles: ActionRuleContextFileConfig[] | null;
  spec: string | null;

  // state
  sequence: number;
  isSkippedInConfig: boolean;
}
