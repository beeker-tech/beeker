import { ConfigException } from '../../../../../../../domain/_shared';

export class ActionVariablesValuesConfigException extends ConfigException {
  constructor(path: string, originalError: Error) {
    const message = `Error when reading action config file: ${path}.\n
    Original error: \n
    ${originalError}
    `;
    super(message);
    this.name = 'ActionConfigException';
  }
}
