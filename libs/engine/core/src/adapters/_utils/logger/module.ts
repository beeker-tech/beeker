import { Global, Module } from '@nestjs/common';
import { LoggerImpl } from './logger';

@Global()
@Module({
  providers: [LoggerImpl],
  exports: [LoggerImpl],
})
export class LoggerModule {}
