import { ConfigException } from '../../../../../../../domain/_shared';
import { ErrorObject } from 'ajv';

export class BadActionConfigSchemaException extends ConfigException {
  constructor(errors: ErrorObject[]) {
    const message = `The following errors were found in action config file: \n${errors.map(
      (error) => `- ${error.message} \n`
    )}`;
    super(message);
    this.name = 'BadActionConfigSchemaException';
  }
}
