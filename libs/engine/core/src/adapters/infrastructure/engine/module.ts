import { Module } from '@nestjs/common';
import { MappersModule } from './mappers.module';
import { EngineActionModule } from './action/module';
import { EngineRuleModule } from './rule/module';
import { FileSystemModule } from '../../../adapters/_utils/file-system/module';

@Module({
  imports: [
    FileSystemModule,
    MappersModule,
    EngineActionModule,
    EngineRuleModule,
  ],
  exports: [EngineActionModule, EngineRuleModule],
})
export class EngineModule {}
