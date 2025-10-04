import { Injectable } from '@nestjs/common';
import {
  YamlParserImpl,
  FileSystemImpl,
  SchemaValidatorImpl,
} from '../../../../../adapters/_utils';
import { ActionConfig } from '@beeker-tech/engine-common';
import { SCHEMA } from './config.schema';
import { BadActionConfigSchemaException } from './config-schema.exception';
import { ActionConfigException } from './config.exception';
import { ActionConfigNotFoundException } from './config-not-found.exception';

@Injectable()
export class ActionConfigParserImpl {
  constructor(
    private readonly fileSystem: FileSystemImpl,
    private readonly yamlParser: YamlParserImpl,
    private readonly schemaValidator: SchemaValidatorImpl
  ) {}

  async load(path: string): Promise<ActionConfig> {
    const file: string = await this.readConfig(path);

    const actionConfig: ActionConfig = await this.yamlParser.load(file);

    this.validateConfig(actionConfig);

    return actionConfig;
  }

  async loadAll(paths: string[]): Promise<ActionConfig[]> {
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

  private async parseYamls(files: string[]): Promise<ActionConfig[]> {
    const actionsConfigs: ActionConfig[] = [];

    if (!files) return actionsConfigs;

    for (const file of files) {
      const actionConfig: ActionConfig = await this.yamlParser.load(file);

      this.validateConfig(actionConfig);

      actionsConfigs.push(actionConfig);
    }

    return actionsConfigs;
  }

  private async readConfig(path: string): Promise<string> {
    const config = await this.fileSystem
      .readFile(path)
      .catch((error: Error) => {
        if (error.message.includes('ENOENT')) {
          throw new ActionConfigNotFoundException(path);
        }

        throw new ActionConfigException(path, error);
      });

    return config;
  }

  private validateConfig(actionConfig: ActionConfig) {
    const validate = this.schemaValidator.compile(SCHEMA);
    const isFileValid = validate(actionConfig);

    if (!isFileValid && validate.errors) {
      throw new BadActionConfigSchemaException(validate.errors);
    }
  }
}
