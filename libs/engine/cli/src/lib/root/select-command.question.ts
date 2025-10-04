import { Question, QuestionSet } from 'nest-commander';
import { ROOT_COMMAND_LIST } from './questions.constants';
import { getMessageForSelectCommandFromList } from '../adapters/_utils';
import { ACTION_COMMAND_NAME } from '../engine';

@QuestionSet({ name: ROOT_COMMAND_LIST })
export class SelectCommandFromListQuestion {
  @Question({
    message: getMessageForSelectCommandFromList(),
    name: 'command',
    type: 'list',
    choices: [ACTION_COMMAND_NAME],
  })
  parseResponse(input: string) {
    return input;
  }
}
