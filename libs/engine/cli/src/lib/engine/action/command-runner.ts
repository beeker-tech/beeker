import { Inject, forwardRef } from '@nestjs/common';
import {
  CommandRunner as NestCommandRunner,
  InquirerService,
  SubCommand,
} from 'nest-commander';
import { listCommandsWizard } from './wizards';
import {
  ACTION_COMMAND_DESCRIPTION,
  ACTION_COMMAND_NAME,
} from './command-runner.constants';
import { RootCommandRunner } from '../../root';
import { ActionQuestionRunner } from './question-runner';
import { ActionPreviewCommandRunner } from './commands/preview';
import { ActionExecutionCommandRunner } from './commands/execution';
import { ActionCommandRunnerOptions } from './command-runner-options.interface';

@SubCommand({
  name: ACTION_COMMAND_NAME,
  description: ACTION_COMMAND_DESCRIPTION,
  subCommands: [ActionPreviewCommandRunner, ActionExecutionCommandRunner],
})
export class ActionCommandRunner extends NestCommandRunner {
  constructor(
    protected readonly inquirerService: InquirerService,
    protected readonly actionQuestionRunner: ActionQuestionRunner,
    @Inject(forwardRef(() => RootCommandRunner))
    protected readonly rootCommandRunner: RootCommandRunner,
    protected readonly actionExecutionCommandRunner: ActionExecutionCommandRunner,
    protected readonly actionPreviewCommandRunner: ActionPreviewCommandRunner
  ) {
    super();
  }

  async run(
    _inputs: string[],
    options?: ActionCommandRunnerOptions
  ): Promise<void> {
    const { preview, run } = options || {};

    if (!preview && !run) {
      return this.listCommands();
    }
  }

  async listCommands() {
    return listCommandsWizard.call(this);
  }
}
