import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigServiceImpl } from './config.service';
import { EnvironmentConfigModule } from './environment/module';
import { LocalConfigModule } from './local/module';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    EnvironmentConfigModule,
    LocalConfigModule,
  ],
  providers: [ConfigServiceImpl],
  exports: [ConfigServiceImpl, EnvironmentConfigModule, LocalConfigModule],
})
export class ConfigModule {}
