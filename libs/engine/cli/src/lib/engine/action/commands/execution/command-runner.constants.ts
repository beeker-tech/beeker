import { EXECUTE_COMMAND_NAME } from '../../../../_shared';
import { getCommandDescription, getCommandName } from '../../../../adapters';

export const ACTION_EXECUTION_ENTITY_LABEL = EXECUTE_COMMAND_NAME;
export const ACTION_EXECUTION_ENTITIES_LABEL = EXECUTE_COMMAND_NAME + 's';

export const ACTION_EXECUTION_COMMAND_NAME = getCommandName(
  ACTION_EXECUTION_ENTITY_LABEL
);
export const ACTION_EXECUTION_COMMAND_DESCRIPTION = getCommandDescription(
  ACTION_EXECUTION_ENTITIES_LABEL
);
