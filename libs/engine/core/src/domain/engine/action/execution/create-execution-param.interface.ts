import { ActionExecutionStatus } from '@beeker-tech/engine-common';
import { ActionSpec } from '../spec';
import { ActionRuleApplication } from './rule-application/rule-application.model';
import { ActionExecution } from './execution.model';

export interface CreateExecutionParam {
  // technical
  id?: string;

  // content
  spec: ActionSpec;

  // state
  sequence?: number;
  status?: ActionExecutionStatus;
  startedAt?: Date | null;
  endedAt?: Date | null;
  error?: string | null;

  // options
  shouldParallelize?: boolean;
  shouldApply?: boolean;

  // relations
  needs?: ActionExecution[];
  rulesApplications: ActionRuleApplication[];
}
