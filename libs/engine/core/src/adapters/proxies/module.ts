import { Module } from '@nestjs/common';
import { EngineUseCasesProxiesModule } from './engine/module';
import { WorkspaceUseCasesProxiesModule } from './workspace/module';

@Module({
  imports: [
    EngineUseCasesProxiesModule.register(),
    WorkspaceUseCasesProxiesModule.register(),
  ],
  exports: [EngineUseCasesProxiesModule, WorkspaceUseCasesProxiesModule],
})
export class UseCaseProxiesModule {}
