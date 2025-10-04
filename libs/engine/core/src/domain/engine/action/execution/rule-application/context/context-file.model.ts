import { ActionRuleApplicationContextFileParam } from './context-file-param.interface';

export class ActionRuleApplicationContextFile {
  // content
  name: string;
  path: string;

  constructor(param: ActionRuleApplicationContextFileParam) {
    const { name, path } = param;

    // content
    this.name = name;
    this.path = path;
  }
}
