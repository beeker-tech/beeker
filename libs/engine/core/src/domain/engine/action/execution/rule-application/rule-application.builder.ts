import path from 'path';
import glob, { IOptions } from 'glob';
import { ActionExecutionVariable, Rule } from '../../..';
import { ActionRuleSpec, ActionSpec } from '../../spec';
import { ActionRuleApplication } from './rule-application.model';
import { Logger } from '../../../../_utils';
import { RuleBuilder } from '../../../rule/rule.builder';
import { ActionRuleApplicationFilePathParser } from './file-path';
import { ActionRuleApplicationContextFileBuilder } from './context/context-file.builder';

export class ActionRuleApplicationBuilder {
  constructor(
    private readonly logger: Logger,
    private readonly ruleBuilder: RuleBuilder,
    private readonly ruleFilePathParser: ActionRuleApplicationFilePathParser,
    private readonly contextFileBuilder: ActionRuleApplicationContextFileBuilder
  ) {}

  async buildMany(
    rootDir = '',
    spec: ActionSpec,
    variables: ActionExecutionVariable[] | null,
    actionExecutionId?: string
  ): Promise<ActionRuleApplication[]> {
    const { rules: rulesSpecs } = spec;
    let rulesApplications: ActionRuleApplication[] = [];

    for (const [index, ruleSpec] of rulesSpecs.entries()) {
      const fileRuleApplications: ActionRuleApplication[] | undefined =
        await this.build(
          rootDir,
          spec,
          ruleSpec,
          variables,
          index + 1,
          actionExecutionId
        );

      if (fileRuleApplications) {
        rulesApplications = [...rulesApplications, ...fileRuleApplications];
      }
    }

    return rulesApplications;
  }

  private async build(
    rootDir = '',
    spec: ActionSpec,
    ruleSpec: ActionRuleSpec,
    variables: ActionExecutionVariable[] | null,
    sequence: number,
    actionExecutionId?: string
  ): Promise<ActionRuleApplication[] | undefined> {
    const {
      configPath,
      targetRootDir: customTargetRootDir,
      variableInterpolationMode,
    } = spec;
    const actionConfigRootDir = path.resolve(rootDir, configPath, '..');
    const targetRootDir = path.resolve(
      actionConfigRootDir,
      customTargetRootDir || '.'
    );

    const {
      targetFilePath,
      contextFiles: contextFilesSpecs,
      isSkippedInConfig,
    } = ruleSpec;

    const parsedTargetFilePath: string = this.ruleFilePathParser.parse(
      targetFilePath,
      variables,
      variableInterpolationMode
    );

    const rule: Rule | null = await this.ruleBuilder.buildRule(
      ruleSpec,
      variables,
      variableInterpolationMode
    );

    if (rule == null) return;

    const ruleApplications: ActionRuleApplication[] = [];

    const options: IOptions = {
      cwd: targetRootDir,
    };
    const matchingTargetFilesPaths = glob.sync(parsedTargetFilePath, options);

    for (const matchingTargetFilePath of matchingTargetFilesPaths) {
      const resolvedTargetFilePath = path.resolve(
        targetRootDir,
        matchingTargetFilePath
      );

      const contextFiles = await this.contextFileBuilder.buildMany(
        rootDir,
        configPath,
        contextFilesSpecs,
        variables,
        variableInterpolationMode
      );

      const ruleApplication: ActionRuleApplication = new ActionRuleApplication({
        rule,
        targetFilePath: resolvedTargetFilePath,
        contextFiles,
        sequence,
        actionExecutionId,
        isSkippedInConfig,
      });

      this.logger.verbose(
        'ActionExecutionRuleApplicationBuilder',
        `built rule application ${JSON.stringify(ruleApplication)}`
      );

      ruleApplications.push(ruleApplication);
    }

    return ruleApplications;
  }
}
