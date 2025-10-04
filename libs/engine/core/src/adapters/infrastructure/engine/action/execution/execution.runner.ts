import { Injectable } from '@nestjs/common';
import { ActionExecutionRunner } from '../../../../../domain/engine';
import { ActionRuleApplicationExecutionRunnerImpl } from './rule-application/execution.runner';
import { EventEmitterImpl } from '../../../../../adapters/_utils';

@Injectable()
export class ActionExecutionRunnerImpl extends ActionExecutionRunner {
  constructor(
    eventEmitterImpl: EventEmitterImpl,
    actionRuleApplicationExecutionRunnerImpl: ActionRuleApplicationExecutionRunnerImpl
  ) {
    super(eventEmitterImpl, actionRuleApplicationExecutionRunnerImpl);
  }
}
