import { Global, Module } from '@nestjs/common';
import { GeniusApiModule } from './genius/module';

@Global()
@Module({
  imports: [GeniusApiModule],
  exports: [GeniusApiModule],
})
export class ApiModule {}
