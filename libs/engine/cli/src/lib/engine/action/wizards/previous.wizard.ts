import { ActionCommandRunner } from '../command-runner';

export async function previousWizard(this: ActionCommandRunner): Promise<void> {
  return this.rootCommandRunner.listCommands();
}
