import merge from 'lodash/merge';
import { Logger } from '../../../../domain/_utils';
import {
  ActionSpec,
  ActionExecution,
  ActionExecutionBuilder,
  ActionPreviewRunner,
  ActionSpecFileSystemRepository,
} from '../../../../domain/engine';
import { ActionConfigNotFoundException } from '../config';
import { ActionPreviewParam } from '@beeker-tech/engine-common';

export class PreviewActionExecutionUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly actionSpecFileSystemRepository: ActionSpecFileSystemRepository,
    private readonly actionExecutionBuilder: ActionExecutionBuilder,
    private readonly actionPreviewRunner: ActionPreviewRunner
  ) {}

  async execute(
    param: ActionPreviewParam,
    authHeader?: string
  ): Promise<ActionExecution> {
    const {
      rootDir,
      actionConfigPath,
      variables,
      overrides,
      shouldApply,
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
        shouldApply
      );

    const previewedAction = await this.actionPreviewRunner.preview(
      actionExecution,
      authHeader,
      openAiConfig
    );

    this.logger.verbose(
      `PreviewActionExecutionUseCase`,
      `previewed action ${JSON.stringify(previewedAction)}`
    );

    return previewedAction;
  }
}
