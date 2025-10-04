import { VarInterpMode } from '@beeker-tech/engine-common';
import { ActionRuleSpec } from './action-rule-spec.model';
import { ActionSpecParam } from './action-spec-param.interface';
import { ActionVariableSpec } from './action-variable-spec.model';

export class ActionSpec {
  // technical
  configPath: string;

  // content
  name: string;
  label: string | null;
  description: string | null;
  group: string | null;

  // execution options
  shouldParallelize: boolean;
  targetRootDir: string | null;
  variableInterpolationMode: VarInterpMode | null;

  // relations
  rules: ActionRuleSpec[];
  variables: ActionVariableSpec[] | null;

  constructor(param: ActionSpecParam) {
    const {
      // technical
      configPath,

      // content
      name,
      label = null,
      description = null,
      group = null,

      // execution options
      shouldParallelize = true,
      targetRootDir = null,
      variableInterpolationMode = null,

      // relations
      rules,
      variables = null,
    } = param;

    // technical
    this.configPath = configPath;

    // content
    this.name = name;
    this.label = label;
    this.description = description;
    this.group = group;

    // execution options
    this.shouldParallelize = shouldParallelize;
    this.targetRootDir = targetRootDir;
    this.variableInterpolationMode = variableInterpolationMode;

    // relations
    this.rules = rules;
    this.variables = variables;
  }
}
