import { ActionRuleApplicationExecutionRunner } from './rule-application/execution.runner';
import { ActionExecution } from './execution.model';
import { EventEmitter } from '../../../../domain/_utils';
import { EVENTS } from '@beeker-tech/engine-common';
import { BusinessException } from '../../../../domain/_shared';
import { OpenAiConfig } from '@beeker-tech/genius-client';

export class ActionExecutionRunner {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly actionRuleApplicationExecutionRunner: ActionRuleApplicationExecutionRunner
  ) {}

  async run(
    actionExecution: ActionExecution,
    authHeader?: string,
    openAiConfig?: OpenAiConfig
  ): Promise<ActionExecution> {
    const { rulesApplications, shouldParallelize } = actionExecution;

    actionExecution.run();

    this.eventEmitter.emit(
      EVENTS.ACTION.EXECUTION.RUNNING,
      actionExecution,
      authHeader
    );

    const rules = await this.actionRuleApplicationExecutionRunner
      .runMany(rulesApplications, shouldParallelize, authHeader, openAiConfig)
      .catch((error: Error) =>
        this.handleActionExecutionError(actionExecution, error, authHeader)
      );

    if (!rules) return actionExecution;

    actionExecution.pass(rules);

    this.eventEmitter.emit(
      EVENTS.ACTION.EXECUTION.PASSED,
      actionExecution,
      authHeader
    );

    return actionExecution;
  }

  private handleActionExecutionError = (
    actionExecution: ActionExecution,
    error: Error,
    authHeader?: string
  ) => {
    if (error instanceof BusinessException) {
      actionExecution.fail(error.message);

      this.eventEmitter.emit(
        EVENTS.ACTION.EXECUTION.FAILED,
        actionExecution,
        authHeader
      );

      return;
    }

    throw error;
  };
}
