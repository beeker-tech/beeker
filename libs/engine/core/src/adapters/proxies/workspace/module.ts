import { DynamicModule, Module } from '@nestjs/common';
import { WorkspaceModule } from '../../../adapters/infrastructure/workspace/module';
import { WORKSPACE_PROXIES, WorkspaceProviders } from './index';

@Module({
  imports: [WorkspaceModule],
})
export class WorkspaceUseCasesProxiesModule {
  static register(): DynamicModule {
    return {
      module: WorkspaceUseCasesProxiesModule,
      providers: [...WorkspaceProviders],
      exports: [...WORKSPACE_PROXIES],
    };
  }
}
