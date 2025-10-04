import { PREVIEW_COMMAND_NAME } from '../../../../_shared';
import { getCommandDescription, getCommandName } from '../../../../adapters';

export const ACTION_PREVIEW_ENTITY_LABEL = PREVIEW_COMMAND_NAME;
export const ACTION_PREVIEW_ENTITIES_LABEL = PREVIEW_COMMAND_NAME + 's';

export const ACTION_PREVIEW_COMMAND_NAME = getCommandName(
  ACTION_PREVIEW_ENTITY_LABEL
);
export const ACTION_PREVIEW_COMMAND_DESCRIPTION = getCommandDescription(
  ACTION_PREVIEW_ENTITIES_LABEL
);
