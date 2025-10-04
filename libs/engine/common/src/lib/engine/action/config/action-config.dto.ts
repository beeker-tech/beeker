import { ActionVariableConfig } from './action-variable-config.dto';
import { ActionRuleConfig } from './action-rule-config.dto';
import { ActionConfigVarInterpMode } from './variable-interpolation-mode.dto';

export interface ActionConfig {
  name: string;
  label?: string;
  description?: string;
  group?: string;

  variables?: ActionVariableConfig[];
  rules: ActionRuleConfig[];

  parallelize?: boolean;
  target_root_dir?: string;
  variable_interpolation_mode?: ActionConfigVarInterpMode;
}
