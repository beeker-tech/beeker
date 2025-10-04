import { Module } from '@nestjs/common';
import { ActionConfigParserImpl } from './config.parser';
import { YamlParserModule } from '../../../../../adapters/_utils/yaml-parser/module';
import { FileSystemModule } from '../../../../../adapters/_utils/file-system/module';
import { SchemaValidatorModule } from '../../../../../adapters/_utils/schema-validator/module';
import { ActionConfigFileSystemRepositoryImpl } from './config.fs-repository';
import { FileSearchModule } from '../../../../../adapters/_utils/file-search/module';

@Module({
  imports: [
    FileSystemModule,
    FileSearchModule,
    YamlParserModule,
    SchemaValidatorModule,
  ],
  providers: [ActionConfigParserImpl, ActionConfigFileSystemRepositoryImpl],
  exports: [ActionConfigParserImpl, ActionConfigFileSystemRepositoryImpl],
})
export class EngineActionConfigModule {}
