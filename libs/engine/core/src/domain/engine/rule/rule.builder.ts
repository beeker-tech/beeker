import { Logger } from '../../_utils';
import { RuleFileSystemRepository } from './rule.fs-repository';
import { RuleTemplateParser } from './rule-template.parser';
import { ActionExecutionVariable, ActionRuleSpec } from '../action';
import { Rule } from './rule.model';
import { GetRuleParam } from './get-rule-param.model';
import { VarInterpMode } from '@beeker-tech/engine-common';

export class RuleBuilder {
  constructor(
    private readonly logger: Logger,
    private readonly ruleFileSystemRepository: RuleFileSystemRepository,
    private readonly ruleTemplateParser: RuleTemplateParser
  ) {}

  public async buildRule(
    ruleSpec: ActionRuleSpec,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ) {
    const { configPath, spec } = ruleSpec;
    let rule: Rule | null = null;

    if (spec != null) {
      rule = await this.buildInlineRule(
        ruleSpec,
        variables,
        variableInterpolationMode
      );
    } else if (configPath != null) {
      rule = await this.buildFileSystemRule(
        ruleSpec,
        variables,
        variableInterpolationMode
      );
    }

    this.logger.verbose(`RuleBuilder`, `built rule ${JSON.stringify(rule)}`);

    return rule;
  }

  private async buildInlineRule(
    ruleSpec: ActionRuleSpec,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ) {
    const { spec, name } = ruleSpec;

    if (!spec) return null;

    const parsedRule = await this.ruleTemplateParser.parse(
      name,
      spec,
      variables,
      variableInterpolationMode
    );
    const rule = new Rule(null, name, parsedRule);

    return rule;
  }

  private async buildFileSystemRule(
    ruleSpec: ActionRuleSpec,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ) {
    const { configPath, name } = ruleSpec;

    if (!configPath) return null;

    const param: GetRuleParam = { path: configPath, name };
    const rule: Rule | null = await this.ruleFileSystemRepository.getRule(
      param
    );

    if (!rule) return null;

    const parsedRule = await this.ruleTemplateParser.parse(
      name,
      rule.spec,
      variables,
      variableInterpolationMode
    );

    rule.spec = parsedRule;

    return rule;
  }
}
