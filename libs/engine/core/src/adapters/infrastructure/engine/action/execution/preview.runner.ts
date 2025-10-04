import { Injectable } from '@nestjs/common';
import { ActionPreviewRunner } from '../../../../../domain/engine';
import { ActionRuleApplicationPreviewRunnerImpl } from './rule-application/preview.runner';
import { EventEmitterImpl } from '../../../../../adapters/_utils';

@Injectable()
export class ActionPreviewRunnerImpl extends ActionPreviewRunner {
  constructor(
    eventEmitterImpl: EventEmitterImpl,
    actionRuleApplicationPreviewRunnerImpl: ActionRuleApplicationPreviewRunnerImpl
  ) {
    super(eventEmitterImpl, actionRuleApplicationPreviewRunnerImpl);
  }
}
