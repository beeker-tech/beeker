import { ActionRuleApplication } from './rule-application.model';
import { EventEmitter, FileDiff, FileSystem } from '../../../../_utils';
import { EVENTS } from '@beeker-tech/engine-common';
import {
  CompletionApi,
  CreateCodeCompletionParam,
  OpenAiConfig,
} from '@beeker-tech/genius-client';
import { AxiosRequestConfig } from 'axios';
import { ParsedDiff } from '@beeker-tech/engine-common';
import { CompletionContextBuilder } from './completion-context.builder';

export class ActionRuleApplicationExecutionRunner {
  constructor(
    private readonly eventEmitter: EventEmitter,
    private readonly completionApi: CompletionApi,
    private readonly completionContextBuilder: CompletionContextBuilder,
    private readonly fileSystem: FileSystem,
    private readonly fileDiff: FileDiff
  ) {}

  async run(
    actionRuleApplication: ActionRuleApplication,
    authHeader?: string,
    openAiConfig?: OpenAiConfig
  ): Promise<ActionRuleApplication> {
    const { rule, targetFilePath, contextFiles, isSkippedInConfig } =
      actionRuleApplication;
    const { spec } = rule;
    let code = '';

    if (isSkippedInConfig) {
      return this.handleSkipRuleApplicationExecution(actionRuleApplication);
    }

    actionRuleApplication.run();

    this.eventEmitter.emit(
      EVENTS.RULE.APPLICATION.EXECUTION.RUNNING,
      actionRuleApplication,
      authHeader
    );

    if (!spec) {
      this.handleRuleApplicationExecutionError(
        actionRuleApplication,
        `No spec was found for applying rule ${rule.name}.`
      );

      return actionRuleApplication;
    }

    const isFileAlreadyPresent = await this.fileSystem.pathExists(
      targetFilePath
    );

    if (isFileAlreadyPresent) {
      code = await this.fileSystem.readFile(targetFilePath);
    }

    const contexts = await this.completionContextBuilder.buildMany(
      contextFiles
    );

    const param: CreateCodeCompletionParam = {
      prompt: spec,
      code,
      contexts,
      openAiConfig,
    };
    const axiosConfig: AxiosRequestConfig = {
      headers: { Authorization: authHeader },
      transformResponse: (res) => res,
    };
    const { data: targetDocument } = await this.completionApi
      .createCodeCompletion(param, axiosConfig)
      .catch((error: Error) => {
        this.handleRuleApplicationExecutionError(
          actionRuleApplication,
          error.message
        );

        throw error;
      });

    if (!targetDocument) return actionRuleApplication;

    const diff: ParsedDiff = await this.fileDiff.structuredPatch(
      targetFilePath,
      targetFilePath,
      code,
      targetDocument
    );

    await this.fileSystem.outputFile(targetFilePath, targetDocument);

    actionRuleApplication.pass(diff, targetDocument);

    this.eventEmitter.emit(
      EVENTS.RULE.APPLICATION.EXECUTION.PASSED,
      actionRuleApplication,
      authHeader
    );

    return actionRuleApplication;
  }

  async runMany(
    actionRuleApplications: ActionRuleApplication[],
    shouldParallelize?: boolean,
    authHeader?: string,
    openAiConfig?: OpenAiConfig
  ): Promise<ActionRuleApplication[]> {
    if (shouldParallelize) {
      return this.runManyParallelized(
        actionRuleApplications,
        authHeader,
        openAiConfig
      );
    }

    return this.runManySequential(
      actionRuleApplications,
      authHeader,
      openAiConfig
    );
  }

  async runManyParallelized(
    actionRuleApplications: ActionRuleApplication[],
    authHeader?: string,
    openAiConfig?: OpenAiConfig
  ): Promise<ActionRuleApplication[]> {
    const rulesPromises: Promise<ActionRuleApplication>[] =
      actionRuleApplications.map(
        async (actionRuleApplication: ActionRuleApplication) => {
          return this.run(actionRuleApplication, authHeader, openAiConfig);
        }
      );
    const applications = await Promise.all(rulesPromises);

    return applications;
  }

  async runManySequential(
    actionRuleApplications: ActionRuleApplication[],
    authHeader?: string,
    openAiConfig?: OpenAiConfig
  ): Promise<ActionRuleApplication[]> {
    const applications: ActionRuleApplication[] = [];

    for (const actionRuleApplication of actionRuleApplications) {
      const application = await this.run(
        actionRuleApplication,
        authHeader,
        openAiConfig
      );

      applications.push(application);
    }

    return applications;
  }

  private handleRuleApplicationExecutionError = (
    actionRuleApplication: ActionRuleApplication,
    errorMessage: string,
    authHeader?: string
  ) => {
    actionRuleApplication.fail(errorMessage);

    this.eventEmitter.emit(
      EVENTS.RULE.APPLICATION.EXECUTION.FAILED,
      actionRuleApplication,
      authHeader
    );
  };

  private handleSkipRuleApplicationExecution = (
    actionRuleApplication: ActionRuleApplication,
    authHeader?: string
  ) => {
    actionRuleApplication.skip();

    this.eventEmitter.emit(
      EVENTS.RULE.APPLICATION.PREVIEW.SKIPPED,
      actionRuleApplication,
      authHeader
    );

    return actionRuleApplication;
  };
}
