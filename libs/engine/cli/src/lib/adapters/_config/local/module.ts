import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LocalConfigServiceImpl } from './local.config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [LocalConfigServiceImpl],
  exports: [LocalConfigServiceImpl],
})
export class LocalConfigModule {}
