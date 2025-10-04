import { Injectable } from '@nestjs/common';
import { LoggerImpl, VariableParserImpl } from '../../../../../_utils';
import { ActionRuleApplicationFilePathParser } from '../../../../../../domain/engine/action/execution';

@Injectable()
export class ActionRuleApplicationFilePathParserImpl extends ActionRuleApplicationFilePathParser {
  constructor(logger: LoggerImpl, variableParser: VariableParserImpl) {
    super(logger, variableParser);
  }
}
