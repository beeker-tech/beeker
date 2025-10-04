import { ActionExecution } from '@beeker-tech/engine-common';
import {
  displayMessage,
  displayLineBreak,
  getSuccessTextForExecuteCommand,
} from '../../../../adapters';
import { ACTION_EXECUTION_ENTITY_LABEL } from './command-runner.constants';
import { displayRuleApplication } from '../_shared';

export const displayActionExecutionResult = (
  executedAction: ActionExecution
) => {
  const { spec, rulesApplications } = executedAction;

  displayLineBreak();

  rulesApplications.forEach(displayRuleApplication);

  displayMessage(
    getSuccessTextForExecuteCommand(ACTION_EXECUTION_ENTITY_LABEL, spec.name)
  );
};
