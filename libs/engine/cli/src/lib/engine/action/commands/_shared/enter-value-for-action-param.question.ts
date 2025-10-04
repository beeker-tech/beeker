import { Question, QuestionSet } from 'nest-commander';
import { ACTION_EXECUTION_QUESTIONS } from './question-runner.constants';
import { getMessageForEnterParamValue } from '../../../../adapters/_utils';
import { Answers } from 'inquirer';

@QuestionSet({
  name: ACTION_EXECUTION_QUESTIONS.ENTER_VALUE_FOR_ACTION_PARAM,
})
export class EnterValueForActionParamQuestion {
  @Question({
    message: async (data: Answers) => {
      const { name, defaultValue, isRequired } = data;
      const isCancelable = isRequired && defaultValue == null;

      return getMessageForEnterParamValue(name, !isRequired, isCancelable);
    },
    default: async (data: Answers) => {
      const { defaultValue } = data;

      return defaultValue;
    },
    name: 'value',
    type: 'input',
  })
  parseResponse(input: string) {
    return input;
  }
}
