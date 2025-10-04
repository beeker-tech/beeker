import { DynamicModule, Module } from '@nestjs/common';
import { EngineModule } from '../../../adapters/infrastructure/engine/module';
import { ActionProviders, ACTION_PROXIES } from './action';

@Module({
  imports: [EngineModule],
})
export class EngineUseCasesProxiesModule {
  static register(): DynamicModule {
    return {
      module: EngineUseCasesProxiesModule,
      providers: [...ActionProviders],
      exports: [...ACTION_PROXIES],
    };
  }
}
