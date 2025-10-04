import path from 'path';
import { Injectable } from '@nestjs/common';
import {
  ActionRuleContextFileSpec,
  ActionRuleContextFileSpecParam,
} from '../../../../../domain/engine';
import { ActionRuleContextFileConfig } from '@beeker-tech/engine-common';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

@Injectable()
export class ActionRuleContextFileSpecBuilderImpl {
  public build(
    actionConfigPath: string,
    context?: string | string[] | ActionRuleContextFileConfig[] | null,
    rootDir = ''
  ): ActionRuleContextFileSpec[] | null {
    if (isString(context)) {
      return this.buildOne(actionConfigPath, 'Context1', `${context}`, rootDir);
    }

    if (isArray(context)) {
      return this.buildMany(actionConfigPath, context, rootDir);
    }

    return null;
  }

  public buildMany(
    actionConfigPath: string,
    contextFilesConfigs: ActionRuleContextFileConfig[] | string[],
    rootDir = ''
  ): ActionRuleContextFileSpec[] {
    const contextFilesSpecs = contextFilesConfigs.flatMap(
      (
        contextFileConfig: ActionRuleContextFileConfig | string,
        index: number
      ) => {
        if (isString(contextFileConfig)) {
          const name = `Context${index + 1}`;
          const path = `${contextFileConfig}`;

          const contextFileSpec = this.buildOne(
            actionConfigPath,
            name,
            path,
            rootDir
          );

          return contextFileSpec;
        }

        if (isObject(contextFileConfig)) {
          const { name, path } =
            contextFileConfig as ActionRuleContextFileConfig;
          const contextFileSpec = this.buildOne(
            actionConfigPath,
            name,
            path,
            rootDir
          );

          if (contextFileSpec) return contextFileSpec;
        }

        return [];
      }
    );

    return contextFilesSpecs;
  }

  private buildOne(
    actionConfigPath: string,
    name: string,
    path: string,
    rootDir = ''
  ) {
    const resolvedPath = this.resolvePathRelativelyToConfig(
      actionConfigPath,
      path,
      rootDir
    );
    const param: ActionRuleContextFileSpecParam = {
      name,
      path: resolvedPath,
    };

    const contextFileSpec = new ActionRuleContextFileSpec(param);

    return [contextFileSpec];
  }

  private resolvePathRelativelyToConfig(
    actionConfigPath: string,
    relativeFilePath: string,
    rootDir = ''
  ): string {
    const resolvedPath = path.resolve(
      rootDir,
      actionConfigPath,
      '..',
      relativeFilePath
    );

    return resolvedPath;
  }
}
