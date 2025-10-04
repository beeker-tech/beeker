import { ActionRuleSpec } from './action-rule-spec.dto';
import { ActionSpec } from './action-spec.dto';
import { ActionVariableSpec } from './action-variable-spec.dto';

export interface ActionSpecDetails extends ActionSpec {
  // relations
  rules: ActionRuleSpec[];
  variables: ActionVariableSpec[] | null;
}
