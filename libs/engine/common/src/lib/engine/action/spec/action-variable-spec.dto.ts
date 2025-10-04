export interface ActionVariableSpec {
  // content
  name: string;
  label: string | null;
  description: string | null;
  value: string | number | null;
  defaultValue: string | number | null;
  isRequired: boolean;
}
