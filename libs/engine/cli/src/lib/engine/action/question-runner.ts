import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';

import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { ACTION_QUESTIONS } from './question-runner.constants';

@Injectable()
export class ActionQuestionRunner {
  constructor(private readonly inquirerService: InquirerService) {
    this.inquirerService.inquirer.registerPrompt(
      'autocomplete',
      inquirerPrompt
    );
  }

  async askSelectActionExecutionCommand() {
    const { command } = await this.inquirerService.ask<{ command: string }>(
      ACTION_QUESTIONS.SELECT_ACTION_COMMAND,
      undefined
    );

    return command;
  }
}
