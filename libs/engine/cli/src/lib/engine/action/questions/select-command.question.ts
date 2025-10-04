import { Question, QuestionSet } from 'nest-commander';
import { ACTION_QUESTIONS } from '../question-runner.constants';
import { EXECUTE_COMMAND_NAME, PREVIEW_COMMAND_NAME } from '../../../_shared';
import { getMessageForSelectCommandFromList } from '../../../adapters/_utils';

@QuestionSet({
  name: ACTION_QUESTIONS.SELECT_ACTION_COMMAND,
})
export class SelectActionCommandFromListQuestion {
  @Question({
    message: getMessageForSelectCommandFromList(),
    name: 'command',
    type: 'list',
    choices: [PREVIEW_COMMAND_NAME, EXECUTE_COMMAND_NAME],
    default: PREVIEW_COMMAND_NAME,
  })
  parseResponse(input: string) {
    return input;
  }
}
