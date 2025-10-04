import { ROOT_COMMAND_LIST } from '../questions.constants';
import { RootCommandRunner } from '../command-runner';
import { ACTION_COMMAND_NAME } from '../../engine/action';

export async function listCommandsWizard(
  this: RootCommandRunner
): Promise<void> {
  const { command } = await this.inquirerService.ask<{ command: string }>(
    ROOT_COMMAND_LIST,
    undefined
  );

  if (command == ACTION_COMMAND_NAME) {
    this.actionCommandRunner.listCommands();
  }
}
