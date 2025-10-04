import { Module } from '@nestjs/common';
import { ActionExecutionRunnerImpl } from './execution.runner';
import {
  ActionRuleApplicationExecutionRunnerImpl,
  ActionRuleApplicationPreviewRunnerImpl,
  ActionRuleApplicationFilePathParserImpl,
  ActionRuleApplicationBuilderImpl,
} from './rule-application';
import { FileSystemModule } from '../../../../../adapters/_utils/file-system/module';
import { FileDiffModule } from '../../../../../adapters/_utils/file-diff/module';
import { VariableParserModule } from '../../../../../adapters/_utils/variable-parser/module';
import { ActionExecutionBuilderImpl } from './execution.builder';
import { EngineRuleModule } from '../../rule/module';
import { WorkspaceModule } from '../../../../../adapters/infrastructure/workspace/module';
import { ActionPreviewRunnerImpl } from './preview.runner';
import { EventEmitterModule } from '../../../../../adapters/_utils/event-emitter/module';
import { ApiModule } from '../../../../../adapters/api/module';
import { CompletionContextBuilderImpl } from './rule-application/completion-context.builder';
import {
  ActionRuleApplicationContextFileBuilderImpl,
  ActionRuleApplicationContextFileLoaderImpl,
} from './rule-application/context';

@Module({
  imports: [
    FileSystemModule,
    FileDiffModule,
    VariableParserModule,
    EventEmitterModule,
    ApiModule,
    EngineRuleModule,
    WorkspaceModule,
  ],
  providers: [
    ActionRuleApplicationContextFileBuilderImpl,
    ActionRuleApplicationContextFileLoaderImpl,
    CompletionContextBuilderImpl,
    ActionExecutionBuilderImpl,
    ActionExecutionRunnerImpl,
    ActionPreviewRunnerImpl,
    ActionRuleApplicationExecutionRunnerImpl,
    ActionRuleApplicationPreviewRunnerImpl,
    ActionRuleApplicationFilePathParserImpl,
    ActionRuleApplicationBuilderImpl,
  ],
  exports: [
    ActionRuleApplicationContextFileBuilderImpl,
    ActionRuleApplicationContextFileLoaderImpl,
    CompletionContextBuilderImpl,
    ActionExecutionBuilderImpl,
    ActionExecutionRunnerImpl,
    ActionPreviewRunnerImpl,
    ActionRuleApplicationExecutionRunnerImpl,
    ActionRuleApplicationPreviewRunnerImpl,
    ActionRuleApplicationFilePathParserImpl,
    ActionRuleApplicationBuilderImpl,
  ],
})
export class EngineActionExecutionModule {}
