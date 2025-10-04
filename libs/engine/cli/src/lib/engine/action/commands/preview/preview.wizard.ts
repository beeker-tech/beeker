import { ActionPreviewCommandRunner } from './command-runner';

export async function previewWizard(
  this: ActionPreviewCommandRunner,
  actionsRootDir?: string
): Promise<void> {
  const path =
    await this.actionExecutionQuestionRunner.askEnterPathForActionExecution(
      actionsRootDir
    );

  if (path) await this.run([], { path });

  this.rootCommandRunner.listCommands();
}
