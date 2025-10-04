import { ActionRuleContextFileConfig } from './action-rule-context-file-config.dto';

export interface ActionRuleConfig {
  name: string;
  target: string;
  context?: string | string[] | ActionRuleContextFileConfig[];
  spec?: string;
  path?: string;
  only?: boolean;
}
