import { Module } from '@nestjs/common';
import { RootModule } from './root/module';
import { LoadingModule } from './adapters/_utils/loading/module';
import { LoggerModule } from '@beeker-tech/engine-core/adapters/_utils/logger/module';
import { ConfigModule } from './adapters/_config/module';

@Module({
  imports: [ConfigModule, LoggerModule, LoadingModule, RootModule],
  exports: [RootModule],
})
export class CliModule {}
