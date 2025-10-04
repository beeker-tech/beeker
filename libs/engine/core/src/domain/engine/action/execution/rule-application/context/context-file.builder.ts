import path from 'path';
import glob, { IOptions } from 'glob';
import { Logger } from '../../../../../_utils';
import { ActionRuleContextFileSpec } from '../../../spec/action-rule-context-file-spec.model';
import { ActionRuleApplicationContextFile } from './context-file.model';
import { ActionRuleApplicationFilePathParser } from '../file-path';
import { ActionExecutionVariable } from '../../execution-variable.model';
import { VarInterpMode } from '@beeker-tech/engine-common';

export class ActionRuleApplicationContextFileBuilder {
  constructor(
    private readonly logger: Logger,
    private readonly ruleFilePathParser: ActionRuleApplicationFilePathParser
  ) {}

  async buildMany(
    rootDir = '',
    actionConfigPath: string,
    contextFileSpecs: ActionRuleContextFileSpec[] | null,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ): Promise<ActionRuleApplicationContextFile[] | null> {
    if (!contextFileSpecs) return null;

    let contextFiles: ActionRuleApplicationContextFile[] = [];

    for (const contextFileSpec of contextFileSpecs) {
      const builtContextFiles: ActionRuleApplicationContextFile[] | undefined =
        await this.build(
          rootDir,
          actionConfigPath,
          contextFileSpec,
          variables,
          variableInterpolationMode
        );

      if (builtContextFiles) {
        contextFiles = [...contextFiles, ...builtContextFiles];
      }
    }

    return contextFiles;
  }

  private async build(
    rootDir = '',
    actionConfigPath: string,
    contextFileSpec: ActionRuleContextFileSpec,
    variables: ActionExecutionVariable[] | null,
    variableInterpolationMode?: VarInterpMode | null
  ): Promise<ActionRuleApplicationContextFile[] | undefined> {
    const contextFiles: ActionRuleApplicationContextFile[] = [];
    const { name, path: contextFilePath } = contextFileSpec;
    const parsedContextFilePath: string = this.ruleFilePathParser.parse(
      contextFilePath,
      variables,
      variableInterpolationMode
    );

    const contextFileDir = path.resolve(rootDir, actionConfigPath, '..');
    const options: IOptions = {
      cwd: contextFileDir,
    };
    const matchingContextFilesPaths = glob.sync(parsedContextFilePath, options);

    for (const matchingContextFilePath of matchingContextFilesPaths) {
      const resolvedContextFilePath = path.resolve(
        contextFileDir,
        matchingContextFilePath
      );
      const contextFile: ActionRuleApplicationContextFile =
        new ActionRuleApplicationContextFile({
          name,
          path: resolvedContextFilePath,
        });

      this.logger.verbose(
        'ActionRuleApplicationContextFileBuilder',
        `built rule application context file ${JSON.stringify(contextFile)}`
      );

      contextFiles.push(contextFile);
    }

    return contextFiles;
  }
}
