import { Module } from '@nestjs/common';
import { YamlParserImpl } from './yaml.parser';

@Module({
  providers: [YamlParserImpl],
  exports: [YamlParserImpl],
})
export class YamlParserModule {}
