export interface ActionVariableSpecParam {
  // content
  name: string;
  label?: string | null;
  description?: string | null;
  value?: string | number;
  defaultValue?: string | number | null;
  isRequired?: boolean;
}
