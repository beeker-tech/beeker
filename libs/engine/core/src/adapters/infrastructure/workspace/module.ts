import { Module } from '@nestjs/common';
import { WorkspaceManagerImpl } from './workspace.manager';
import { SourceControlModule } from '../../../adapters/_utils/source-control/module';

@Module({
  imports: [SourceControlModule],
  providers: [WorkspaceManagerImpl],
  exports: [WorkspaceManagerImpl],
})
export class WorkspaceModule {}
