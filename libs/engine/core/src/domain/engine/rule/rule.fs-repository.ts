import { GetRuleParam, Rule } from '../../../domain/engine';

export interface RuleFileSystemRepository {
  getRule(param: GetRuleParam): Promise<Rule | null>;
}
