import { getCommandDescription, getCommandName } from '../../adapters';

export const ACTION_ENTITY_LABEL = 'action';
export const ACTION_ENTITIES_LABEL = 'actions';

export const ACTION_COMMAND_NAME = getCommandName(ACTION_ENTITY_LABEL);
export const ACTION_COMMAND_DESCRIPTION =
  getCommandDescription('Manage application');
