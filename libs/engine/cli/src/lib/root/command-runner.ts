import { Inject, forwardRef } from '@nestjs/common';
import {
  Option,
  CommandRunner as NestCommandRunner,
  InquirerService,
  RootCommand,
} from 'nest-commander';
import packageJson from '../../../package.json';
import { RootCommandRunnerOptions } from './command-runner-options.interface';
import { COMMAND_DESCRIPTION } from './command-runner.constants';
import {
  ActionCommandRunner,
  ActionExecutionCommandRunner,
  ActionPreviewCommandRunner,
} from '../engine';
import { VERSION_FLAGS } from '../_shared';
import { displayInfo } from '../adapters';

@RootCommand({
  description: COMMAND_DESCRIPTION,
  subCommands: [
    ActionCommandRunner,
    ActionPreviewCommandRunner,
    ActionExecutionCommandRunner,
  ],
})
export class RootCommandRunner extends NestCommandRunner {
  constructor(
    protected readonly inquirerService: InquirerService,
    @Inject(forwardRef(() => ActionCommandRunner))
    protected readonly actionCommandRunner: ActionCommandRunner
  ) {
    super();
  }

  async run(
    _inputs: string[],
    options?: RootCommandRunnerOptions
  ): Promise<void> {
    const { version } = options || {};

    if (version) {
      displayInfo(`Beeker version ${packageJson.version}`);

      return;
    }

    if (!options?.action) {
      return this.listCommands();
    }
  }

  async listCommands() {
    return this.actionCommandRunner.listCommands();
  }

  @Option({
    flags: `${VERSION_FLAGS} [version]`,
    description: `Show version`,
  })
  previewWithTargetRootDir(version: string) {
    return version;
  }
}
