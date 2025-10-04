import { Module } from '@nestjs/common';

import { EngineActionConfigModule } from './config/module';
import { EngineActionExecutionModule } from './execution/module';
import { EngineActionSpecModule } from './spec/module';
import { MappersModule } from '../mappers.module';
import { EngineRuleModule } from '../rule/module';
import { EngineActionVariableValueConfigModule } from './variable/value/config/module';

@Module({
  imports: [
    MappersModule,
    EngineActionConfigModule,
    EngineActionExecutionModule,
    EngineActionSpecModule,
    EngineActionVariableValueConfigModule,
    EngineRuleModule,
  ],
  exports: [
    EngineActionConfigModule,
    EngineActionExecutionModule,
    EngineActionVariableValueConfigModule,
    EngineActionSpecModule,
  ],
})
export class EngineActionModule {}
