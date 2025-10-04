import { ActionRuleContextFileSpec } from './action-rule-context-file-spec.model';

export interface ActionRuleSpecParam {
  // technical
  configPath?: string | null;

  // content
  name: string;
  targetFilePath: string;
  contextFiles?: ActionRuleContextFileSpec[] | null;
  spec?: string | null;

  // state
  sequence: number;
  isSkippedInConfig?: boolean;
}
