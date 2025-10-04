import { ActionExecution } from '@beeker-tech/engine-common';
import {
  displayMessage,
  displayWarning,
  getSuccessTextForPreviewCommand,
  displayLineBreak,
} from '../../../../adapters';
import { ACTION_PREVIEW_ENTITY_LABEL } from './command-runner.constants';
import { displayRuleApplication } from '../_shared';

export const displayActionExecutionResult = (
  executedAction: ActionExecution
) => {
  const { spec, rulesApplications } = executedAction;

  displayLineBreak();

  rulesApplications.forEach(displayRuleApplication);

  displayMessage(
    getSuccessTextForPreviewCommand(ACTION_PREVIEW_ENTITY_LABEL, spec.name)
  );

  displayWarning(`Ⓘ This is a preview, the original files were not modifed.\n`);
};
