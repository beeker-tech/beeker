import { ConfigException } from '../../../../domain/_shared';

export class RuleTemplateException extends ConfigException {
  constructor(path: string, originalError: Error) {
    const message = `Error when reading rule template file: ${path}.\n
    Original error: \n
    ${originalError}
    `;
    super(message);
    this.name = 'ActionConfigException';
  }
}
