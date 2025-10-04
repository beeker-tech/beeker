import { Injectable } from '@nestjs/common';
import { ActionVariableSpec } from '../../../../../domain/engine';
import { ActionVariableConfig } from '@beeker-tech/engine-common';

@Injectable()
export class ActionVariableSpecBuilderImpl {
  public buildMany(
    actionVariablesConfigs?: ActionVariableConfig[]
  ): ActionVariableSpec[] | null {
    if (!actionVariablesConfigs) return null;

    return actionVariablesConfigs.flatMap(
      (actionVariableConfig: ActionVariableConfig) =>
        this.build(actionVariableConfig) || []
    );
  }

  public build(
    actionVariableConfig: ActionVariableConfig
  ): ActionVariableSpec | null {
    const { name, label, description, value, default_value, required } =
      actionVariableConfig;

    const actionVariableSpec: ActionVariableSpec = new ActionVariableSpec({
      name,
      label,
      description,
      value: value,
      defaultValue: default_value,
      isRequired: required,
    });

    return actionVariableSpec;
  }
}
