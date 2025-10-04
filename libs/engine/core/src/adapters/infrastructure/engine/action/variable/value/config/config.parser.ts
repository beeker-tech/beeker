import { Injectable } from '@nestjs/common';
import {
  YamlParserImpl,
  FileSystemImpl,
  SchemaValidatorImpl,
} from '../../../../../../_utils';
import { ActionVariableValueConfig } from '@beeker-tech/engine-common';
import { SCHEMA } from './config.schema';
import { BadActionConfigSchemaException } from './config-schema.exception';
import { ActionVariablesValuesConfigException } from './config.exception';
import { ActionVariablesValuesConfigNotFoundException } from './config-not-found.exception';

@Injectable()
export class ActionVariablesValuesConfigParserImpl {
  constructor(
    private readonly fileSystem: FileSystemImpl,
    private readonly yamlParser: YamlParserImpl,
    private readonly schemaValidator: SchemaValidatorImpl
  ) {}

  async load(path: string): Promise<ActionVariableValueConfig[]> {
    const file: string = await this.readConfig(path);

    const actionVariablesConfig: ActionVariableValueConfig[] =
      await this.yamlParser.load(file);

    this.validateConfig(actionVariablesConfig);

    return actionVariablesConfig;
  }

  async loadAll(paths: string[]): Promise<ActionVariableValueConfig[][]> {
    const files = await this.readFiles(paths);

    return this.parseYamls(files);
  }

  private async readFiles(paths: string[]): Promise<string[]> {
    const files: string[] = [];

    if (!paths) return files;

    for (const path of paths) {
      const file = await this.fileSystem.readFile(path);

      files.push(file);
    }

    return files;
  }

  private async parseYamls(
    files: string[]
  ): Promise<ActionVariableValueConfig[][]> {
    const actionsVariablesConfigs: ActionVariableValueConfig[][] = [];

    if (!files) return actionsVariablesConfigs;

    for (const file of files) {
      const actionVariablesConfig: ActionVariableValueConfig[] =
        await this.yamlParser.load(file);

      this.validateConfig(actionVariablesConfig);

      actionsVariablesConfigs.push(actionVariablesConfig);
    }

    return actionsVariablesConfigs;
  }

  private async readConfig(path: string): Promise<string> {
    const config = await this.fileSystem
      .readFile(path)
      .catch((error: Error) => {
        if (error.message.includes('ENOENT')) {
          throw new ActionVariablesValuesConfigNotFoundException(path);
        }

        throw new ActionVariablesValuesConfigException(path, error);
      });

    return config;
  }

  private validateConfig(actionVariablesConfig: ActionVariableValueConfig[]) {
    const validate = this.schemaValidator.compile(SCHEMA);
    const isFileValid = validate(actionVariablesConfig);

    if (!isFileValid && validate.errors) {
      throw new BadActionConfigSchemaException(validate.errors);
    }
  }
}
