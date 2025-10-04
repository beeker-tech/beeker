import merge from 'lodash/merge';
import { EventEmitter, Logger } from '../../../../domain/_utils';
import {
  ActionSpec,
  ActionExecution,
  ActionExecutionBuilder,
  ActionExecutionRunner,
  ActionSpecFileSystemRepository,
} from '../../../../domain/engine';
import { ActionConfigNotFoundException } from '../config';
import { ActionExecutionParam } from '@beeker-tech/engine-common';
import { EVENTS } from '@beeker-tech/engine-common';

export class ExecuteActionUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter,
    private readonly actionSpecFileSystemRepository: ActionSpecFileSystemRepository,
    private readonly actionExecutionBuilder: ActionExecutionBuilder,
    private readonly actionExecutionRunner: ActionExecutionRunner
  ) {}

  async execute(
    param: ActionExecutionParam,
    authHeader?: string
  ): Promise<ActionExecution> {
    const {
      id,
      rootDir,
      actionConfigPath,
      variables,
      overrides,
      openAiConfig,
    } = param;
    const actionSpecOnFileSystem: ActionSpec | null =
      await this.actionSpecFileSystemRepository.getActionSpec(
        actionConfigPath,
        rootDir
      );

    if (!actionSpecOnFileSystem)
      throw new ActionConfigNotFoundException(actionConfigPath);

    const actionSpec = merge(actionSpecOnFileSystem, overrides);

    const actionExecution: ActionExecution =
      await this.actionExecutionBuilder.build(
        rootDir,
        actionSpec,
        variables,
        true,
        id
      );

    const ranActionExecution: ActionExecution =
      await this.actionExecutionRunner.run(
        actionExecution,
        authHeader,
        openAiConfig
      );

    this.eventEmitter.emit(
      EVENTS.ACTION.EXECUTION.PASSED,
      ranActionExecution,
      authHeader
    );

    this.logger.verbose(
      `RunActionUseCase`,
      `ran actionExecution ${JSON.stringify(ranActionExecution)}`
    );

    return actionExecution;
  }
}
