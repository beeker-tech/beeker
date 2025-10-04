import { Injectable } from '@nestjs/common';
import { Rule } from '../../../../domain/engine';

@Injectable()
export class RuleMapper {
  public toRule(path: string, name: string, spec: string): Rule {
    const rule: Rule = new Rule(path, name, spec);

    return rule;
  }
}
