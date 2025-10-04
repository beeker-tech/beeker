import { Module } from '@nestjs/common';
import { ActionVariablesValuesConfigParserImpl } from './config.parser';
import { YamlParserModule } from '../../../../../../_utils/yaml-parser/module';
import { FileSystemModule } from '../../../../../../_utils/file-system/module';
import { SchemaValidatorModule } from '../../../../../../_utils/schema-validator/module';
import { ActionVariablesValuesConfigFileSystemRepositoryImpl } from './config.fs-repository';
import { FileSearchModule } from '../../../../../../_utils/file-search/module';

@Module({
  imports: [
    FileSystemModule,
    FileSearchModule,
    YamlParserModule,
    SchemaValidatorModule,
  ],
  providers: [
    ActionVariablesValuesConfigParserImpl,
    ActionVariablesValuesConfigFileSystemRepositoryImpl,
  ],
  exports: [
    ActionVariablesValuesConfigParserImpl,
    ActionVariablesValuesConfigFileSystemRepositoryImpl,
  ],
})
export class EngineActionVariableValueConfigModule {}
