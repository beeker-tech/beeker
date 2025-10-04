import { ActionVariableSpecParam } from './action-variable-spec-param.interface';

export class ActionVariableSpec {
  // content
  name: string;
  label: string | null;
  description: string | null;
  value: string | number | null;
  defaultValue: string | number | null;
  isRequired: boolean;

  constructor(param: ActionVariableSpecParam) {
    const {
      name,
      label = null,
      description = null,
      value = null,
      defaultValue = null,
      isRequired = true,
    } = param;
    this.name = name;
    this.label = label;
    this.description = description;
    this.value = value;
    this.defaultValue = defaultValue;
    this.isRequired = isRequired;
  }
}
