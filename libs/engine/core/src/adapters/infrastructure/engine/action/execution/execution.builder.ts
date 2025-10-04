import { Injectable } from '@nestjs/common';
import { ActionExecutionBuilder } from '../../../../../domain/engine';
import { LoggerImpl } from '../../../../../adapters/_utils';
import { ActionRuleApplicationBuilderImpl } from './rule-application';

@Injectable()
export class ActionExecutionBuilderImpl extends ActionExecutionBuilder {
  constructor(
    loggerImpl: LoggerImpl,
    actionRuleApplicationBuilderImpl: ActionRuleApplicationBuilderImpl
  ) {
    super(loggerImpl, actionRuleApplicationBuilderImpl);
  }
}
