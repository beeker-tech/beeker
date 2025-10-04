import { Rule } from '../../rule';
import { ParsedDiff } from './parsed-diff.dto';
import { ActionRuleApplicationStatus } from './rule-application-status.dto';

export interface ActionRuleApplication {
  // state
  sequence: number;
  status: ActionRuleApplicationStatus;
  startedAt: Date | null;
  endedAt: Date | null;
  error: string | null;
  targetFilePath: string;
  diff?: ParsedDiff;
  isSkippedInConfig: boolean;

  // relations
  rule: Rule;
  actionExecutionId?: string;
}
