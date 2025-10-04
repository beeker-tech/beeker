import { Question, QuestionSet } from 'nest-commander';
import { ACTION_PREVIEW_QUESTIONS } from './question-runner.constants';

@QuestionSet({
  name: ACTION_PREVIEW_QUESTIONS.SHOULD_APPLY_MODIFICATIONS,
})
export class ShouldApplyModificationsQuestion {
  @Question({
    message: 'Do you want to apply these modifications ?',
    name: 'answer',
    type: 'confirm',
    default: false,
  })
  parseResponse(input: string) {
    return input;
  }
}
