import nodePath from 'path';
import { Injectable } from '@nestjs/common';
import { ActionConfigParserImpl } from '../config';
import {
  ActionSpec,
  ActionSpecFileSystemRepository,
} from '../../../../../domain/engine';
import { ActionSpecBuilderImpl } from './action-spec.builder';
import { ActionConfig } from '@beeker-tech/engine-common';

@Injectable()
export class ActionSpecFileSystemRepositoryImpl
  implements ActionSpecFileSystemRepository
{
  constructor(
    private actionConfigParser: ActionConfigParserImpl,
    private actionSpecBuilder: ActionSpecBuilderImpl
  ) {}

  async getActionSpec(path: string, rootDir = ''): Promise<ActionSpec> {
    const resolvedPath = nodePath.resolve(rootDir, path);

    const config: ActionConfig = await this.actionConfigParser.load(
      resolvedPath
    );

    return this.actionSpecBuilder.build(path, config, rootDir);
  }

  async findActionsSpecs(paths: string[], rootDir = ''): Promise<ActionSpec[]> {
    const specs: ActionSpec[] = [];

    for (const path of paths) {
      const resolvedPath = nodePath.resolve(rootDir, path);

      const config: ActionConfig = await this.actionConfigParser
        .load(resolvedPath)
        .catch();

      if (config) {
        const spec: ActionSpec = await this.actionSpecBuilder.build(
          path,
          config,
          rootDir
        );

        specs.push(spec);
      }
    }

    return specs;
  }
}
