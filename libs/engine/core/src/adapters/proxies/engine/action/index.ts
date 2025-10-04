import {
  ActionExecutionProviders,
  ACTION_EXECUTION_PROXIES,
} from './execution';

import { ACTION_SPEC_PROXIES, ActionSpecProviders } from './spec';

import { ActionConfigProviders, ACTION_CONFIG_PROXIES } from './config';

export const ActionProviders = [
  ...ActionConfigProviders,
  ...ActionExecutionProviders,
  ...ActionSpecProviders,
];
export const ACTION_PROXIES = [
  ...ACTION_CONFIG_PROXIES,
  ...ACTION_EXECUTION_PROXIES,
  ...ACTION_SPEC_PROXIES,
];

export * from './config';
export * from './execution';
export * from './spec';
