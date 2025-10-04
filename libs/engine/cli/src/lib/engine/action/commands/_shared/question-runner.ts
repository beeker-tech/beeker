import nodePath from 'path';
import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';
import { ACTION_EXECUTION_QUESTIONS } from './question-runner.constants';
import {
  ActionExecutionVariable,
  ActionVariableSpec,
} from '@beeker-tech/engine-common';
import { displayInfo } from '../../../../adapters';
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { Answers } from 'inquirer';
import { ConfigServiceImpl } from '../../../../adapters/_config';
import { ActionSpec } from '@beeker-tech/engine-core/domain/engine';
import { FileSearchImpl } from '@beeker-tech/engine-core/adapters/_utils';

@Injectable()
export class ActionExecutionQuestionRunner {
  constructor(
    private readonly configService: ConfigServiceImpl,
    private readonly fileSearch: FileSearchImpl,
    private readonly inquirerService: InquirerService
  ) {
    this.inquirerService.inquirer.registerPrompt(
      'autocomplete',
      inquirerPrompt
    );
  }

  async askEnterPathForActionExecution(actionsRootDir?: string) {
    const defaultRootDir: string = this.configService.getActionsRootDir();
    const rootDir = actionsRootDir || defaultRootDir;
    const { path } = await this.inquirerService.inquirer.prompt([
      {
        type: 'autocomplete',
        name: 'path',
        message: 'Enter the action to execute: ',
        source: async (_answersSoFar: string, input?: string) => {
          const serializedInput: string = input || '';
          const filter = `${serializedInput}.*.action.yml`;

          const configFiles = await this.fileSearch.searchDownwards(
            rootDir,
            filter
          );

          const configfilesFromRootDir = configFiles?.map((file) =>
            nodePath.relative(rootDir, file)
          );

          return configfilesFromRootDir;
        },
        choices: (data: Answers) => {
          const { choices } = data;

          return choices;
        },
      },
    ]);

    return `${rootDir}/${path}`;
  }

  async askValueForActionVariable(
    variableSpec: ActionVariableSpec
  ): Promise<string | number | null> {
    const { name, defaultValue, isRequired } = variableSpec;
    const { value } = await this.inquirerService.ask<ActionVariableSpec>(
      ACTION_EXECUTION_QUESTIONS.ENTER_VALUE_FOR_ACTION_PARAM,
      {
        name,
        defaultValue,
        isRequired,
      }
    );

    return value;
  }

  async askValuesForActionVariables(
    spec: ActionSpec,
    variablesFromOptions?: string[] | null
  ): Promise<ActionExecutionVariable[] | null> {
    const { variables: variablesSpecs } = spec;
    const actionVariables: ActionExecutionVariable[] = [];

    if (!variablesSpecs) return actionVariables;

    const variablesWithPromptsLength = variablesSpecs.filter(
      (variable: ActionVariableSpec, index: number) =>
        variable.value == null && variablesFromOptions?.[index] == null
    ).length;

    if (variablesWithPromptsLength) {
      displayInfo(
        `This action requires you to give ${variablesWithPromptsLength} ${
          (variablesWithPromptsLength > 1 && 'parameters') || 'parameter'
        }.`
      );
    }

    for (const [index, variableSpec] of variablesSpecs.entries()) {
      const valueFromOptions = variablesFromOptions?.[index];
      const { name, value, isRequired } = variableSpec;

      if (valueFromOptions) {
        const actionVariable: ActionExecutionVariable = {
          name,
          value: valueFromOptions,
        };

        actionVariables.push(actionVariable);
      } else if (value == null) {
        const value = await this.askValueForActionVariable(variableSpec);

        if (isRequired && !value) return null;

        const actionVariable: ActionExecutionVariable = {
          name,
          value: (value && `${value}`) || '',
        };

        actionVariables.push(actionVariable);
      }
    }

    return actionVariables;
  }
}
