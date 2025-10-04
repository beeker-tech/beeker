import { Module } from '@nestjs/common';
import { EngineActionConfigModule } from '../config/module';
import { ActionSpecFileSystemRepositoryImpl } from './action-spec.fs-repository';
import { ActionSpecBuilderImpl } from './action-spec.builder';
import { MappersModule } from '../../mappers.module';
import { ActionRuleSpecBuilderImpl } from './action-rule-spec.builder';
import { ActionVariableSpecBuilderImpl } from './action-variable-spec.builder';
import { ActionRuleContextFileSpecBuilderImpl } from './action-rule-context-file-spec.builder';

@Module({
  imports: [EngineActionConfigModule, MappersModule],
  providers: [
    ActionRuleContextFileSpecBuilderImpl,
    ActionRuleSpecBuilderImpl,
    ActionSpecBuilderImpl,
    ActionVariableSpecBuilderImpl,
    ActionSpecFileSystemRepositoryImpl,
  ],
  exports: [
    ActionRuleContextFileSpecBuilderImpl,
    ActionRuleSpecBuilderImpl,
    ActionSpecBuilderImpl,
    ActionVariableSpecBuilderImpl,
    ActionSpecFileSystemRepositoryImpl,
  ],
})
export class EngineActionSpecModule {}
