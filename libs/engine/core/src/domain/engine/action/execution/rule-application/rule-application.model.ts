import { ActionRuleApplicationStatus } from '@beeker-tech/engine-common';
import { Rule } from '../../../rule';
import { ParsedDiff } from 'diff';
import { CreateActionRuleApplicationParam } from './create-rule-application-param.interface';
import { ActionRuleApplicationContextFile } from './context/context-file.model';

export class ActionRuleApplication {
  // state
  sequence: number;
  startedAt: Date | null;
  endedAt: Date | null;
  status: ActionRuleApplicationStatus;
  error: string | null;
  targetFilePath: string;
  contextFiles: ActionRuleApplicationContextFile[] | null;
  diff?: ParsedDiff;
  targetDocument?: string;
  isSkippedInConfig: boolean;

  // relations
  rule: Rule;
  actionExecutionId?: string;

  constructor(param: CreateActionRuleApplicationParam) {
    const {
      // state
      sequence,
      startedAt = null,
      endedAt = null,
      error = null,
      targetFilePath,
      contextFiles = null,
      diff,
      isSkippedInConfig,

      // relations
      rule,
      actionExecutionId,
    } = param;

    // state
    this.sequence = sequence;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.status = ActionRuleApplicationStatus.PENDING;
    this.error = error;
    this.targetFilePath = targetFilePath;
    this.contextFiles = contextFiles;
    this.diff = diff;
    this.isSkippedInConfig = isSkippedInConfig;

    // relations
    this.rule = rule;
    this.actionExecutionId = actionExecutionId;
  }

  preview() {
    this.status = ActionRuleApplicationStatus.PENDING;
    this.startedAt = new Date();
  }

  run() {
    this.status = ActionRuleApplicationStatus.RUNNING;
    this.startedAt = new Date();
  }

  skip() {
    this.status = ActionRuleApplicationStatus.RUNNING;
  }

  pass(diff: ParsedDiff, targetDocument: string) {
    this.diff = diff;
    this.targetDocument = targetDocument;
    this.status = ActionRuleApplicationStatus.PASSED;
    this.endedAt = new Date();
  }

  fail(error?: string | null) {
    this.status = ActionRuleApplicationStatus.FAILED;
    this.endedAt = new Date();
    if (error) this.error = error;
  }
}
