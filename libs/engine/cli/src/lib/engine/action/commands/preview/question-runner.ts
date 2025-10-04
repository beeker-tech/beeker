import { Injectable } from '@nestjs/common';
import { InquirerService } from 'nest-commander';

import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { ACTION_PREVIEW_QUESTIONS } from './question-runner.constants';

@Injectable()
export class ActionPreviewQuestionRunner {
  constructor(private readonly inquirerService: InquirerService) {
    this.inquirerService.inquirer.registerPrompt(
      'autocomplete',
      inquirerPrompt
    );
  }

  async askShouldApplyModifications() {
    const { answer } = await this.inquirerService.ask<{ answer: boolean }>(
      ACTION_PREVIEW_QUESTIONS.SHOULD_APPLY_MODIFICATIONS,
      undefined
    );

    return answer;
  }
}
