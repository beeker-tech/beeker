import { ActionExecutionVariable } from './execution-variable.dto';
import { ActionSpec } from '../spec';
import { OpenAiConfig } from './openai-config.dto';

export interface ActionExecutionParam {
  id?: string;
  rootDir?: string;
  actionConfigPath: string;
  variables?: ActionExecutionVariable[];
  overrides?: Partial<ActionSpec>;
  openAiConfig?: OpenAiConfig;
}
