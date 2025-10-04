import { Injectable } from '@nestjs/common';
import { RuleBuilder } from '../../../../domain/engine';
import { LoggerImpl } from '../../../../adapters/_utils';
import { RuleFileSystemRepositoryImpl } from './rule.fs-repository';
import { RuleTemplateParserImpl } from './rule-template.parser';

@Injectable()
export class RuleBuilderImpl extends RuleBuilder {
  constructor(
    loggerImpl: LoggerImpl,
    ruleFileSystemRepositoryImpl: RuleFileSystemRepositoryImpl,
    ruleTemplateParserImpl: RuleTemplateParserImpl
  ) {
    super(loggerImpl, ruleFileSystemRepositoryImpl, ruleTemplateParserImpl);
  }
}
