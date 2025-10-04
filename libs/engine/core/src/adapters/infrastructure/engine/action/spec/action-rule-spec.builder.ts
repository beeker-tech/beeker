import path from 'path';
import { Injectable } from '@nestjs/common';
import { ActionRuleSpec } from '../../../../../domain/engine';
import { ActionRuleConfig } from '@beeker-tech/engine-common';
import { ActionRuleContextFileSpecBuilderImpl } from './action-rule-context-file-spec.builder';

@Injectable()
export class ActionRuleSpecBuilderImpl {
  constructor(
    private actionRuleContextFileSpecBuilderImpl: ActionRuleContextFileSpecBuilderImpl
  ) {}

  public buildMany(
    actionConfigPath: string,
    actionRulesConfigs: ActionRuleConfig[],
    rootDir = ''
  ): ActionRuleSpec[] {
    const hasRulesWithOnlyKeyword = actionRulesConfigs.some(
      (config) => config.only
    );

    const actionRulesSpecs = actionRulesConfigs.flatMap(
      (actionRuleConfig: ActionRuleConfig, index: number) => {
        const actionRuleSpec = this.build(
          actionConfigPath,
          actionRuleConfig,
          index,
          hasRulesWithOnlyKeyword,
          rootDir
        );

        if (actionRuleSpec) return actionRuleSpec;

        return [];
      }
    );

    return actionRulesSpecs;
  }

  public build(
    actionConfigPath: string,
    actionRuleConfig: ActionRuleConfig,
    index: number,
    hasRulesWithOnly: boolean,
    rootDir = ''
  ): ActionRuleSpec | null {
    const { spec, only } = actionRuleConfig;
    const sequence = index + 1;
    const isSkippedInConfig = hasRulesWithOnly && !only;

    if (spec != null) {
      return this.buildActionInlineRuleSpec(
        actionConfigPath,
        actionRuleConfig,
        sequence,
        isSkippedInConfig,
        rootDir
      );
    }

    return this.buildActionFileSystemRuleSpec(
      actionConfigPath,
      actionRuleConfig,
      sequence,
      isSkippedInConfig,
      rootDir
    );
  }

  private buildActionFileSystemRuleSpec(
    actionConfigPath: string,
    actionRuleConfig: ActionRuleConfig,
    sequence: number,
    isSkippedInConfig: boolean,
    rootDir = ''
  ): ActionRuleSpec | null {
    const { path, name, target, context } = actionRuleConfig;
    const configPath = path || `${name}.beek`;

    const ruleResolvedPath = this.resolvePathRelativelyToConfig(
      actionConfigPath,
      configPath,
      rootDir
    );

    const contextFiles = this.actionRuleContextFileSpecBuilderImpl.build(
      actionConfigPath,
      context,
      rootDir
    );

    const actionRule = new ActionRuleSpec({
      configPath: ruleResolvedPath,
      name,
      targetFilePath: target,
      contextFiles,
      sequence,
      isSkippedInConfig,
    });

    return actionRule;
  }

  private buildActionInlineRuleSpec(
    actionConfigPath: string,
    actionRuleConfig: ActionRuleConfig,
    sequence: number,
    isSkippedInConfig: boolean,
    rootDir = ''
  ): ActionRuleSpec | null {
    const { name, spec, target, context } = actionRuleConfig;

    if (spec == null) return null;

    const contextFiles = this.actionRuleContextFileSpecBuilderImpl.build(
      actionConfigPath,
      context,
      rootDir
    );
    const actionRule = new ActionRuleSpec({
      name,
      targetFilePath: target,
      contextFiles,
      spec,
      sequence,
      isSkippedInConfig,
    });

    return actionRule;
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
