import { ActionRuleApplicationPreviewRunner } from './rule-application/preview.runner';
import { ActionExecution } from './execution.model';
import { EventEmitter } from '../../../../domain/_utils';
import { EVENTS } from '@beeker-tech/engine-common';
import { BusinessException } from '../../../../domain/_shared';
import { OpenAiConfig } from '@beeker-tech/genius-client';

export class ActionPreviewRunner {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly actionRuleApplicationPreviewRunner: ActionRuleApplicationPreviewRunner
  ) {}

  async preview(
    actionExecution: ActionExecution,
    authHeader?: string,
    openAiConfig?: OpenAiConfig
  ): Promise<ActionExecution> {
    const { rulesApplications, shouldParallelize, shouldApply } =
      actionExecution;

    actionExecution.preview();

    this.eventEmitter.emit(
      EVENTS.ACTION.PREVIEW.RUNNING,
      actionExecution,
      authHeader
    );

    const rules = await this.actionRuleApplicationPreviewRunner
      .previewMany(
        rulesApplications,
        shouldApply,
        shouldParallelize,
        authHeader,
        openAiConfig
      )
      .catch((error: Error) =>
        this.handleActionPreviewError(actionExecution, error, authHeader)
      );

    if (!rules) return actionExecution;

    actionExecution.pass(rules);

    this.eventEmitter.emit(
      EVENTS.ACTION.PREVIEW.PASSED,
      actionExecution,
      authHeader
    );

    return actionExecution;
  }

  private handleActionPreviewError = (
    actionExecution: ActionExecution,
    error: Error,
    authHeader?: string
  ) => {
    if (error instanceof BusinessException) {
      actionExecution.fail(error.message);

      this.eventEmitter.emit(
        EVENTS.ACTION.PREVIEW.FAILED,
        actionExecution,
        authHeader
      );

      return;
    }

    throw error;
  };
}
