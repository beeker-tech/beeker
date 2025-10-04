import { Module, forwardRef } from '@nestjs/common';
import { RootModule } from '../../root/module';
import { FileSearchModule } from '@beeker-tech/engine-core/adapters/_utils/file-search/module';
import { FileSystemModule } from '@beeker-tech/engine-core/adapters/_utils/file-system/module';
import { UseCaseProxiesModule } from '@beeker-tech/engine-core/adapters/proxies/module';
import {
  ActionExecutionQuestionRunner,
  EnterValueForActionParamQuestion,
} from './commands/_shared';
import { ActionCommandRunner } from './command-runner';
import { ActionQuestionRunner } from './question-runner';
import { SelectActionCommandFromListQuestion } from './questions';
import {
  ActionExecutionCommandRunner,
  ActionPreviewCommandRunner,
  ShouldApplyModificationsQuestion,
} from './commands';
import { ActionPreviewQuestionRunner } from './commands/preview/question-runner';

@Module({
  imports: [
    FileSystemModule,
    FileSearchModule,
    forwardRef(() => RootModule),
    UseCaseProxiesModule,
  ],
  providers: [
    SelectActionCommandFromListQuestion,
    EnterValueForActionParamQuestion,
    ShouldApplyModificationsQuestion,
    ActionCommandRunner,
    ActionExecutionCommandRunner,
    ActionPreviewCommandRunner,
    ActionQuestionRunner,
    ActionExecutionQuestionRunner,
    ActionPreviewQuestionRunner,
  ],
  exports: [ActionCommandRunner],
})
export class ActionModule {}
