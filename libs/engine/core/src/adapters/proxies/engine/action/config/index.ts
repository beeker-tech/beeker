import {
  SEARCH_ACTIONS_CONFIGS_USECASE_PROXY,
  SearchActionsConfigsUseCaseProvider,
} from './search-actions-configs.proxy';

export const ActionConfigProviders = [SearchActionsConfigsUseCaseProvider];
export const ACTION_CONFIG_PROXIES = [SEARCH_ACTIONS_CONFIGS_USECASE_PROXY];

export { SEARCH_ACTIONS_CONFIGS_USECASE_PROXY };
