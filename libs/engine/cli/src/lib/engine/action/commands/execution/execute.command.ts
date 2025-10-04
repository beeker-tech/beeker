import path from 'path';
import {
  getLoadingTextForExecuteCommand,
  displayError,
  getErrorTextForExecuteCommand,
  getErrorMessage,
  getAuthorizationHeader,
} from '../../../../adapters/_utils';
import { ActionExecutionCommandRunner } from './command-runner';
import {
  ActionExecution,
  ActionExecutionParam,
  ActionExecutionVariable,
} from '@beeker-tech/engine-common';
import { displayActionExecutionResult } from './execute.formatter';
import { ACTION_ENTITY_LABEL } from '../../command-runner.constants';
import { OpenAiConfig } from '@beeker-tech/genius-client';
import { ActionSpec } from '@beeker-tech/engine-core/domain/engine';

export async function executeActionCommand(
  this: ActionExecutionCommandRunner,
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

    await executeAction.call(this, rootDir, path, variables, overrides);
  } catch (error: unknown) {
    handleExecuteActionError.call(this, rootDir, path, error);
  }
}

export async function executeAction(
  this: ActionExecutionCommandRunner,
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
    getLoadingTextForExecuteCommand(
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
  const executedAction: ActionExecution = await this.executeActionUseCase
    .getInstance()
    .execute(actionExecutionParam, authHeader);

  this.loadingService.stopLoading();

  displayActionExecutionResult(executedAction);

  return executedAction;
}

export async function handleExecuteActionError(
  this: ActionExecutionCommandRunner,
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
    getErrorTextForExecuteCommand(ACTION_ENTITY_LABEL, actionConfigRelativePath)
  );

  displayError(getErrorMessage(error));
}
