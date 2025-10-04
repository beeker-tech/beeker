import { Module } from '@nestjs/common';
import { RuleMapper } from './rule';

@Module({
  providers: [RuleMapper],
  exports: [RuleMapper],
})
export class MappersModule {}
