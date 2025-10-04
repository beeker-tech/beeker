import {
  PREVIOUS_COMMAND_NAME,
  EXECUTE_COMMAND_NAME,
  PREVIEW_COMMAND_NAME,
} from '../../../_shared';
import { ActionCommandRunner } from '../command-runner';
import { previousWizard } from './previous.wizard';
import { executeWizard, previewWizard } from '../commands';

export async function listCommandsWizard(
  this: ActionCommandRunner
): Promise<void> {
  const command =
    await this.actionQuestionRunner.askSelectActionExecutionCommand();

  if (command == PREVIOUS_COMMAND_NAME) {
    previousWizard.call(this);
  } else if (command == PREVIEW_COMMAND_NAME) {
    previewWizard.call(this.actionPreviewCommandRunner);
  } else if (command == EXECUTE_COMMAND_NAME) {
    executeWizard.call(this.actionExecutionCommandRunner);
  }
}
