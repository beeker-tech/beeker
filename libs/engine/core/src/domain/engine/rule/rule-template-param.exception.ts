import { ConfigException } from '../../_shared';

export class RuleTemplateMissingParamException extends ConfigException {
  constructor(ruleName: string, unfilledPlaceholders: string[]) {
    const message =
      `Error when parsing rule ${ruleName} template.\n` +
      `The following placeholders were not filled: ${unfilledPlaceholders.join()}.\n` +
      `Please define variables for these placeholders.\n`;
    super(message);
    this.name = 'RuleTemplateMissingParamException';
  }
}
