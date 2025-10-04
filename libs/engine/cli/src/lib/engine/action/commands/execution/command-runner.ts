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
  ACTION_EXECUTION_ENTITY_LABEL,
  ACTION_EXECUTION_COMMAND_NAME,
  ACTION_EXECUTION_COMMAND_DESCRIPTION,
} from './command-runner.constants';
import { ActionExecutionQuestionRunner } from '../_shared/question-runner';
import { executeActionCommand } from './execute.command';
import {
  EXECUTE_ACTION_USECASE_PROXY,
  GET_ACTION_SPEC_USECASE_PROXY,
} from '@beeker-tech/engine-core';
import {
  ExecuteActionUseCase,
  GetActionSpecUseCase,
} from '@beeker-tech/engine-core/application/engine';
import { UseCaseProxy } from '@beeker-tech/engine-core';
import { ActionExecutionCommandRunnerOptions } from './command-runner-options.interface';
import { ActionSpec } from '@beeker-tech/engine-core/domain/engine';
import { executeWizard } from './execute.wizard';
import { ConfigServiceImpl } from '../../../../adapters/_config/config.service';

@SubCommand({
  name: ACTION_EXECUTION_COMMAND_NAME,
  description: ACTION_EXECUTION_COMMAND_DESCRIPTION,
})
export class ActionExecutionCommandRunner extends NestCommandRunner {
  constructor(
    protected readonly configService: ConfigServiceImpl,
    protected readonly inquirerService: InquirerService,
    protected readonly loadingService: LoadingServiceImpl,
    protected readonly actionExecutionQuestionRunner: ActionExecutionQuestionRunner,
    @Inject(forwardRef(() => RootCommandRunner))
    protected readonly rootCommandRunner: RootCommandRunner,
    @Inject(EXECUTE_ACTION_USECASE_PROXY)
    protected readonly executeActionUseCase: UseCaseProxy<ExecuteActionUseCase>,
    @Inject(GET_ACTION_SPEC_USECASE_PROXY)
    protected readonly getActionSpecUseCase: UseCaseProxy<GetActionSpecUseCase>
  ) {
    super();
  }

  async run(
    _inputs: string[],
    options?: ActionExecutionCommandRunnerOptions
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
      return executeWizard.call(this, absoluteRootDir);
    }

    const overrides: Partial<ActionSpec> = {
      targetRootDir: absoluteTargetRootDir,
    };

    return executeActionCommand.call(
      this,
      absoluteRootDir,
      path,
      resolvedVariables,
      overrides
    );
  }

  @Option({
    flags: `${PATH_FLAGS} [path]`,
    description: getDescriptionForCreateCommand(ACTION_EXECUTION_ENTITY_LABEL),
  })
  executeWithPath(path: string) {
    return path;
  }

  @Option({
    flags: `${ROOT_DIR_FLAGS} [rootDir]`,
    description: getDescriptionForCreateCommand(ACTION_EXECUTION_ENTITY_LABEL),
  })
  executeWithRootDir(rootDir: string) {
    return rootDir;
  }

  @Option({
    flags: `${TARGET_ROOT_DIR_FLAGS} [targetRootDir]`,
    description: getDescriptionForCreateCommand(ACTION_EXECUTION_ENTITY_LABEL),
  })
  executeWithTargetRootDir(targetRootDir: string) {
    return targetRootDir;
  }

  @Option({
    flags: `${VARIABLES_FLAGS} [variables]`,
    description: getDescriptionForCreateCommand(ACTION_EXECUTION_ENTITY_LABEL),
  })
  executeWithVariables(variables: string) {
    return variables;
  }
}
