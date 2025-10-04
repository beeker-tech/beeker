import { ActionRuleApplication } from './rule-application/rule-application.model';
import { ActionSpec } from '../spec';
import { ActionExecutionStatus } from '@beeker-tech/engine-common';
import { ActionExecutionVariable } from './execution-variable.model';
import { CreateExecutionParam } from './create-execution-param.interface';

export class ActionExecution {
  // technical
  id?: string;

  // content
  spec: ActionSpec;

  // state
  sequence: number;
  status: ActionExecutionStatus;
  startedAt: Date | null;
  endedAt: Date | null;
  error: string | null;

  // options
  shouldParallelize: boolean;
  shouldApply: boolean;

  // relations
  variables?: ActionExecutionVariable[];
  rulesApplications: ActionRuleApplication[];

  constructor(param: CreateExecutionParam) {
    const {
      id,
      spec,
      sequence = 1,
      status = ActionExecutionStatus.PENDING,
      startedAt = null,
      endedAt = null,
      error = null,
      shouldParallelize = true,
      shouldApply = true,
      rulesApplications,
    } = param;

    this.id = id;
    this.spec = spec;
    this.sequence = sequence;
    this.status = status;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.error = error;
    this.shouldParallelize = shouldParallelize;
    this.shouldApply = shouldApply;
    this.rulesApplications = rulesApplications || [];
  }

  preview() {
    this.status = ActionExecutionStatus.RUNNING;
    this.startedAt = new Date();
  }

  run() {
    this.status = ActionExecutionStatus.RUNNING;
    this.startedAt = new Date();
  }

  pass(rules: ActionRuleApplication[]) {
    this.rulesApplications = rules;
    this.status = ActionExecutionStatus.PASSED;
    this.endedAt = new Date();
  }

  fail(error?: string | null) {
    this.status = ActionExecutionStatus.FAILED;
    this.endedAt = new Date();
    if (error) this.error = error;
  }
}
