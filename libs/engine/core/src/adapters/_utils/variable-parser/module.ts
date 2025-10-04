import { Module } from '@nestjs/common';
import { VariableParserImpl } from './variable.parser';

@Module({
  providers: [VariableParserImpl],
  exports: [VariableParserImpl],
})
export class VariableParserModule {}
