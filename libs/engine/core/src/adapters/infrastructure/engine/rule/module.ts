import { Module } from '@nestjs/common';
import { RuleFileSystemRepositoryImpl } from './rule.fs-repository';
import { RuleTemplateParserImpl } from './rule-template.parser';
import { MappersModule } from '../mappers.module';
import { FileSystemModule } from '../../../_utils/file-system/module';
import { VariableParserModule } from '../../../_utils/variable-parser/module';
import { RuleBuilderImpl } from './rule.builder';

@Module({
  imports: [
    FileSystemModule,
    VariableParserModule,
    EngineRuleModule,
    MappersModule,
  ],
  providers: [
    RuleFileSystemRepositoryImpl,
    RuleTemplateParserImpl,
    RuleBuilderImpl,
  ],
  exports: [
    RuleFileSystemRepositoryImpl,
    RuleTemplateParserImpl,
    RuleBuilderImpl,
  ],
})
export class EngineRuleModule {}
