import nodePath from 'path';
import { Inject, forwardRef } from '@nestjs/common';
import {
  Option,
  CommandRunner as NestCommandRunner,
  InquirerService,
  SubCommand,
} from 'nest-commander';
import {
  PATH_FLAGS,
  ROOT_DIR_FLAGS,
  TARGET_ROOT_DIR_FLAGS,
  VARIABLES_FLAGS,
} from '../../../../_shared';
import { RootCommandRunner } from '../../../../root/command-runner';
import {
  LoadingServiceImpl,
  getDescriptionForCreateCommand,
} from '../../../../adapters/_utils';
import {
  ACTION_PREVIEW_ENTITY_LABEL,
  ACTION_PREVIEW_COMMAND_NAME,
  ACTION_PREVIEW_COMMAND_DESCRIPTION,
} from './command-runner.constants';
import { ActionExecutionQuestionRunner } from '../_shared';
import { previewActionCommand } from './preview.command';
import {
  GET_ACTION_SPEC_USECASE_PROXY,
  PREVIEW_ACTION_EXECUTION_USECASE_PROXY,
} from '@beeker-tech/engine-core';
import {
  GetActionSpecUseCase,
  PreviewActionExecutionUseCase,
} from '@beeker-tech/engine-core/application/engine';
import { UseCaseProxy } from '@beeker-tech/engine-core';
import { ActionPreviewCommandRunnerOptions } from './command-runner-options.interface';
import { ActionPreviewQuestionRunner } from './question-runner';
import { ActionExecutionCommandRunner } from '../execution';
import { ActionSpec } from '@beeker-tech/engine-common';
import { previewWizard } from './preview.wizard';
import { ConfigServiceImpl } from '../../../../adapters/_config/config.service';

@SubCommand({
  name: ACTION_PREVIEW_COMMAND_NAME,
  description: ACTION_PREVIEW_COMMAND_DESCRIPTION,
})
export class ActionPreviewCommandRunner extends NestCommandRunner {
  constructor(
    protected readonly configService: ConfigServiceImpl,
    protected readonly inquirerService: InquirerService,
    protected readonly loadingService: LoadingServiceImpl,
    protected readonly actionExecutionQuestionRunner: ActionExecutionQuestionRunner,
    protected readonly actionPreviewQuestionRunner: ActionPreviewQuestionRunner,
    protected readonly actionExecutionCommandRunner: ActionExecutionCommandRunner,
    @Inject(forwardRef(() => RootCommandRunner))
    protected readonly rootCommandRunner: RootCommandRunner,
    @Inject(PREVIEW_ACTION_EXECUTION_USECASE_PROXY)
    protected readonly previewActionExecutionsUseCase: UseCaseProxy<PreviewActionExecutionUseCase>,
    @Inject(GET_ACTION_SPEC_USECASE_PROXY)
    protected readonly getActionSpecUseCase: UseCaseProxy<GetActionSpecUseCase>
  ) {
    super();
  }

  async run(
    _inputs: string[],
    options?: ActionPreviewCommandRunnerOptions
  ): Promise<void> {
    const { path, rootDir, targetRootDir, variables } = options || {};
    let absoluteRootDir;
    let absoluteTargetRootDir;
    let resolvedVariables: string[] = [];

    if (rootDir) {
      absoluteRootDir = nodePath.resolve(rootDir);
    }

    if (targetRootDir) {
      absoluteTargetRootDir = nodePath.resolve(targetRootDir);
    }

    if (variables) {
      resolvedVariables = variables.split(',');
    }

    if (!options?.path) {
      return previewWizard.call(this, absoluteRootDir);
    }

    const overrides: Partial<ActionSpec> = {
      targetRootDir: absoluteTargetRootDir,
    };

    return previewActionCommand.call(
      this,
      absoluteRootDir,
      path,
      resolvedVariables,
      overrides
    );
  }

  @Option({
    flags: `${PATH_FLAGS} [path]`,
    description: getDescriptionForCreateCommand(ACTION_PREVIEW_ENTITY_LABEL),
  })
  preview(path: string) {
    return path;
  }

  @Option({
    flags: `${ROOT_DIR_FLAGS} [rootDir]`,
    description: getDescriptionForCreateCommand(ACTION_PREVIEW_ENTITY_LABEL),
  })
  previewWithRootDir(rootDir: string) {
    return rootDir;
  }

  @Option({
    flags: `${TARGET_ROOT_DIR_FLAGS} [targetRootDir]`,
    description: getDescriptionForCreateCommand(ACTION_PREVIEW_ENTITY_LABEL),
  })
  previewWithTargetRootDir(targetRootDir: string) {
    return targetRootDir;
  }

  @Option({
    flags: `${VARIABLES_FLAGS} [variables]`,
    description: getDescriptionForCreateCommand(ACTION_PREVIEW_ENTITY_LABEL),
  })
  executeWithVariables(variables: string) {
    return variables;
  }
}
