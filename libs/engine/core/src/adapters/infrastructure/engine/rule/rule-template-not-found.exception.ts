import { ConfigException } from '../../../../domain/_shared';

export class RuleTemplateNotFoundException extends ConfigException {
  constructor(path: string) {
    const message = `Cannot find rule template file: ${path}`;
    super(message);
    this.name = 'RuleTemplateNotFoundException';
  }
}
