import { ActionRuleContextFileSpecParam } from './action-rule-context-file-param.interface';

export class ActionRuleContextFileSpec {
  name: string;
  path: string;

  constructor(param: ActionRuleContextFileSpecParam) {
    const { name, path } = param;

    this.name = name;
    this.path = path;
  }
}
