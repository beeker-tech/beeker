import {
  FIND_ACTIONS_SPECS_USECASE_PROXY,
  FindActionsSpecsUseCaseProvider,
} from './find-actions-specs.proxy';
import {
  GET_ACTION_SPEC_USECASE_PROXY,
  GetActionSpecUseCaseProvider,
} from './get-action-spec.proxy';
import {
  SEARCH_ACTIONS_SPECS_USECASE_PROXY,
  SearchActionsSpecsUseCaseProvider,
} from './search-actions-specs.proxy';

export const ActionSpecProviders = [
  FindActionsSpecsUseCaseProvider,
  GetActionSpecUseCaseProvider,
  SearchActionsSpecsUseCaseProvider,
];
export const ACTION_SPEC_PROXIES = [
  FIND_ACTIONS_SPECS_USECASE_PROXY,
  GET_ACTION_SPEC_USECASE_PROXY,
  SEARCH_ACTIONS_SPECS_USECASE_PROXY,
];

export {
  FIND_ACTIONS_SPECS_USECASE_PROXY,
  GET_ACTION_SPEC_USECASE_PROXY,
  SEARCH_ACTIONS_SPECS_USECASE_PROXY,
};
