import { Injectable } from '@nestjs/common';
import { LoggerImpl } from '../../../../../_utils';
import { RuleBuilderImpl } from '../../../rule';
import { ActionRuleApplicationFilePathParserImpl } from './file-path.parser';
import { ActionRuleApplicationBuilder } from '../../../../../../domain/engine';
import { ActionRuleApplicationContextFileBuilderImpl } from './context';

@Injectable()
export class ActionRuleApplicationBuilderImpl extends ActionRuleApplicationBuilder {
  constructor(
    logger: LoggerImpl,
    ruleBuilder: RuleBuilderImpl,
    ruleFilePathParser: ActionRuleApplicationFilePathParserImpl,
    contextFileBuilder: ActionRuleApplicationContextFileBuilderImpl
  ) {
    super(logger, ruleBuilder, ruleFilePathParser, contextFileBuilder);
  }
}
