import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigServiceImpl } from './environment.config.service';
import { validate } from './environment.config.validation';
import { defaultConfigFactory } from './environment.config.default';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate,
      load: [defaultConfigFactory],
    }),
  ],
  providers: [EnvironmentConfigServiceImpl],
  exports: [EnvironmentConfigServiceImpl],
})
export class EnvironmentConfigModule {}
