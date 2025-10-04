import { Rule } from '../../../rule';
import { ParsedDiff } from 'diff';
import { ActionRuleApplicationContextFile } from './context/context-file.model';

export interface CreateActionRuleApplicationParam {
  // state
  sequence: number;
  startedAt?: Date | null;
  endedAt?: Date | null;
  error?: string | null;
  rule: Rule;
  targetFilePath: string;
  contextFiles?: ActionRuleApplicationContextFile[] | null;
  diff?: ParsedDiff;
  isSkippedInConfig: boolean;

  // relations
  actionExecutionId?: string;
}
