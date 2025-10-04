import {
  PREVIEW_ACTION_EXECUTION_USECASE_PROXY,
  PreviewActionExecutionUseCaseProvider,
} from './preview-execution.proxy';
import {
  EXECUTE_ACTION_USECASE_PROXY,
  ExecuteActionUseCaseProvider,
} from './run-execution.proxy';

export const ActionExecutionProviders = [
  PreviewActionExecutionUseCaseProvider,
  ExecuteActionUseCaseProvider,
];
export const ACTION_EXECUTION_PROXIES = [
  PREVIEW_ACTION_EXECUTION_USECASE_PROXY,
  EXECUTE_ACTION_USECASE_PROXY,
];

export { PREVIEW_ACTION_EXECUTION_USECASE_PROXY, EXECUTE_ACTION_USECASE_PROXY };
