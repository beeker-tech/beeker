import path from 'path';
import {
  getLoadingTextForPreviewCommand,
  getErrorTextForPreviewCommand,
  displayError,
  getErrorMessage,
  getAuthorizationHeader,
} from '../../../../adapters/_utils';
import { ActionPreviewCommandRunner } from './command-runner';
import {
  ActionExecution,
  ActionExecutionParam,
  ActionExecutionVariable,
} from '@beeker-tech/engine-common';
import { displayActionExecutionResult } from './preview.formatter';
import { ACTION_ENTITY_LABEL } from '../../command-runner.constants';
import { executeActionCommand } from '../execution/execute.command';
import { OpenAiConfig } from '@beeker-tech/genius-client';
import { ActionSpec } from '@beeker-tech/engine-core/domain/engine';

export async function previewActionCommand(
  this: ActionPreviewCommandRunner,
  actionsRootDir?: string | null,
  actionConfigPath?: string | null,
  variablesFromOptions?: string[] | null,
  overrides?: Partial<ActionSpec>
): Promise<void> {
  const defaultRootDir: string = this.configService.getActionsRootDir();
  const rootDir = actionsRootDir || defaultRootDir;
  let path: string = actionConfigPath || '';
  const spec: ActionSpec = await this.getActionSpecUseCase
    .getInstance()
    .execute(path, rootDir);

  try {
    if (!actionConfigPath) {
      path =
        await this.actionExecutionQuestionRunner.askEnterPathForActionExecution();

      if (path == null) return;
    }

    const variables: ActionExecutionVariable[] | null =
      await this.actionExecutionQuestionRunner.askValuesForActionVariables(
        spec,
        variablesFromOptions
      );

    if (variables == null) return;

    const variablesValues = variables?.map((variable) => variable.value);

    await previewAction.call(this, rootDir, path, variables, overrides);
    await applyModificationsIfAsked.call(this, rootDir, path, variablesValues);
  } catch (error: unknown) {
    handlePreviewActionError.call(this, rootDir, path, error);
  }
}

export async function previewAction(
  this: ActionPreviewCommandRunner,
  actionsRootDir: string,
  actionConfigPath: string,
  variables: ActionExecutionVariable[],
  overrides?: Partial<ActionSpec>
): Promise<ActionExecution> {
  const organization = this.configService.getOpenAiOrganization();
  const apiKey = this.configService.getOpenAiApiKey();
  const actionConfigRelativePath = path.relative(
    actionsRootDir,
    actionConfigPath
  );

  this.loadingService.startLoading(
    getLoadingTextForPreviewCommand(
      ACTION_ENTITY_LABEL,
      actionConfigRelativePath
    )
  );

  const openAiConfig: OpenAiConfig = {
    organization,
    apiKey,
  };

  const actionExecutionParam: ActionExecutionParam = {
    rootDir: actionsRootDir,
    actionConfigPath,
    variables,
    overrides,
    openAiConfig,
  };
  const authHeader: string = await getAuthorizationHeader();
  const previewedAction: ActionExecution =
    await this.previewActionExecutionsUseCase
      .getInstance()
      .execute(actionExecutionParam, authHeader);

  this.loadingService.stopLoading();

  displayActionExecutionResult(previewedAction);

  return previewedAction;
}

export async function handlePreviewActionError(
  this: ActionPreviewCommandRunner,
  actionsRootDir: string,
  actionConfigPath: string,
  error: unknown
): Promise<void> {
  const actionConfigRelativePath = path.relative(
    actionsRootDir,
    actionConfigPath
  );

  this.loadingService.stopLoading();

  displayError(
    getErrorTextForPreviewCommand(ACTION_ENTITY_LABEL, actionConfigRelativePath)
  );

  displayError(getErrorMessage(error));
}

export async function applyModificationsIfAsked(
  this: ActionPreviewCommandRunner,
  actionsRootDir: string,
  actionConfigPath: string,
  variables: string[],
  overrides?: Partial<ActionSpec>
): Promise<void> {
  const shouldApply: boolean =
    await this.actionPreviewQuestionRunner.askShouldApplyModifications();

  if (shouldApply) {
    await executeActionCommand.call(
      this.actionExecutionCommandRunner,
      actionsRootDir,
      actionConfigPath,
      variables,
      overrides
    );
  }
}
