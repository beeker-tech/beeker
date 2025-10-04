import { Injectable } from '@nestjs/common';
import { LoggerImpl } from '../../../../../../_utils';
import { ActionRuleApplicationFilePathParserImpl } from '../file-path.parser';
import { ActionRuleApplicationContextFileBuilder } from '../../../../../../../domain/engine';

@Injectable()
export class ActionRuleApplicationContextFileBuilderImpl extends ActionRuleApplicationContextFileBuilder {
  constructor(
    logger: LoggerImpl,
    ruleFilePathParser: ActionRuleApplicationFilePathParserImpl
  ) {
    super(logger, ruleFilePathParser);
  }
}
