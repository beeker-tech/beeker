import { VarInterpMode } from '@beeker-tech/engine-common';
import { ActionRuleSpec } from './action-rule-spec.model';
import { ActionVariableSpec } from './action-variable-spec.model';

export interface ActionSpecParam {
  // technical
  configPath: string;

  // content
  name: string;
  label: string | null;
  description: string | null;
  group: string | null;

  // execution options
  shouldParallelize?: boolean;
  targetRootDir?: string | null;
  variableInterpolationMode?: VarInterpMode | null;

  // relations
  rules: ActionRuleSpec[];
  variables?: ActionVariableSpec[] | null;
}
