import { Injectable } from '@nestjs/common';
import { LoggerImpl, VariableParserImpl } from '../../../../adapters/_utils';
import { RuleTemplateParser } from '../../../../domain/engine/rule/rule-template.parser';

@Injectable()
export class RuleTemplateParserImpl extends RuleTemplateParser {
  constructor(logger: LoggerImpl, variableParser: VariableParserImpl) {
    super(logger, variableParser);
  }
}
