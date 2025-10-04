import { Injectable } from '@nestjs/common';
import {
  ActionRuleSpec,
  ActionSpec,
  ActionSpecParam,
  ActionVariableSpec,
} from '../../../../../domain/engine';
import { LoggerImpl } from '../../../../../adapters/_utils';
import {
  ActionConfig,
  ActionConfigVarInterpMode,
} from '@beeker-tech/engine-common';
import { ActionVariableSpecBuilderImpl } from './action-variable-spec.builder';
import { ActionRuleSpecBuilderImpl } from './action-rule-spec.builder';
import { ActionConfigToSpecVarInterpModeMapper } from './action-config-to-spec-variable-interpolation-mode.mapper';

@Injectable()
export class ActionSpecBuilderImpl {
  constructor(
    private logger: LoggerImpl,
    private actionRuleSpecBuilderImpl: ActionRuleSpecBuilderImpl,
    private actionVariableSpecBuilderImpl: ActionVariableSpecBuilderImpl
  ) {}

  async build(
    configPath: string,
    config: ActionConfig,
    rootDir = ''
  ): Promise<ActionSpec> {
    const actionSpec: ActionSpec = this.buildActionSpec(
      configPath,
      config,
      rootDir
    );

    this.logger.verbose(
      `ActionBuilder`,
      `built actionSpec ${JSON.stringify(actionSpec)}`
    );

    return actionSpec;
  }

  public buildActionSpec(
    configPath: string,
    config: ActionConfig,
    rootDir = ''
  ): ActionSpec {
    const {
      name,
      label = null,
      description = null,
      group = null,
      rules: actionRulesConfig,
      variables: actionVariablesConfig,
      parallelize = true,
      target_root_dir,
      variable_interpolation_mode = ActionConfigVarInterpMode[
        'double-curly-brace'
      ],
    } = config;

    const rulesSpecs: ActionRuleSpec[] =
      this.actionRuleSpecBuilderImpl.buildMany(
        configPath,
        actionRulesConfig,
        rootDir
      );

    const variablesSpecs: ActionVariableSpec[] | null =
      this.actionVariableSpecBuilderImpl.buildMany(actionVariablesConfig);

    const param: ActionSpecParam = {
      configPath,
      name,
      label,
      description,
      group,
      shouldParallelize: parallelize,
      targetRootDir: target_root_dir,
      variableInterpolationMode:
        ActionConfigToSpecVarInterpModeMapper[variable_interpolation_mode],
      rules: rulesSpecs,
      variables: variablesSpecs,
    };

    const actionSpec: ActionSpec = new ActionSpec(param);

    return actionSpec;
  }
}
