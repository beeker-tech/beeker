import { ConfigException } from '../../../../../_shared';

export class FilePathMissingParamException extends ConfigException {
  constructor(filePath: string, unfilledPlaceholders: string[]) {
    const message =
      `Error when parsing file path ${filePath}.\n` +
      `The following placeholders were not filled: ${unfilledPlaceholders.join()}.\n` +
      `Please define variables for these placeholders.\n`;
    super(message);
    this.name = 'FilePathMissingParamException';
  }
}
