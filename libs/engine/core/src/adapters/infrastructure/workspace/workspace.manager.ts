import { Injectable } from '@nestjs/common';
import { WorkspaceManager } from '../../../domain/engine/workspace';
import { LoggerImpl, SourceControlImpl } from '../../../adapters/_utils';

@Injectable()
export class WorkspaceManagerImpl extends WorkspaceManager {
  constructor(logger: LoggerImpl, sourceControl: SourceControlImpl) {
    super(logger, sourceControl);
  }
}
