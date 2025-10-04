import { ActionSpec } from '../spec';
import { ActionExecutionStatus } from './execution-status.dto';
import { ActionExecutionVariable } from './execution-variable.dto';
import { ActionRuleApplication } from './rule-application.dto';

export interface ActionExecution {
  // technical
  id?: string;

  // content
  spec: ActionSpec;
  variables?: ActionExecutionVariable[];

  // state
  sequence: number;
  status: ActionExecutionStatus;
  startedAt: Date | null;
  endedAt: Date | null;
  error: string | null;

  // options
  shouldParallelize: boolean;

  // relations
  rulesApplications: ActionRuleApplication[];
}
