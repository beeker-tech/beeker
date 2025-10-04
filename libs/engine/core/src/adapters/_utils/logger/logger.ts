import { Logger } from '../../../domain/_utils/logger.interface';
import { Injectable, ConsoleLogger } from '@nestjs/common';
import { LogLevel } from './logger.interfaces';
import { LogLevelWeight } from './logger.constants';

@Injectable()
export class LoggerImpl extends ConsoleLogger implements Logger {
  private logLevel: LogLevel;

  constructor() {
    super();
    const logLevel: LogLevel =
      (process.env['LOG_LEVEL'] as LogLevel) || LogLevel.none;

    this.logLevel = logLevel;
  }

  override verbose(context: string, message: string) {
    if (LogLevelWeight[this.logLevel] > LogLevelWeight[LogLevel.verbose])
      return;

    super.verbose(`[VERBOSE] ${message}`, context);
  }

  override debug(context: string, message: string) {
    if (LogLevelWeight[this.logLevel] > LogLevelWeight[LogLevel.debug]) return;

    super.debug(`[DEBUG] ${message}`, context);
  }

  override log(context: string, message: string) {
    if (LogLevelWeight[this.logLevel] > LogLevelWeight[LogLevel.log]) return;

    super.log(`[INFO] ${message}`, context);
  }

  override warn(context: string, message: string) {
    if (LogLevelWeight[this.logLevel] > LogLevelWeight[LogLevel.warn]) return;

    super.warn(`[WARN] ${message}`, context);
  }

  override error(context: string, message: string, trace?: string) {
    if (LogLevelWeight[this.logLevel] > LogLevelWeight[LogLevel.error]) return;

    super.error(`[ERROR] ${message}`, trace, context);
  }
}
