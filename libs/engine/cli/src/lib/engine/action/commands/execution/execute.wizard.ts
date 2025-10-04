import { ActionExecutionCommandRunner } from './command-runner';

export async function executeWizard(
  this: ActionExecutionCommandRunner,
  actionsRootDir?: string
): Promise<void> {
  const path =
    await this.actionExecutionQuestionRunner.askEnterPathForActionExecution(
      actionsRootDir
    );

  if (path) await this.run([], { path });

  this.rootCommandRunner.listCommands();
}
