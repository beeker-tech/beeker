#!/usr/bin/env node

import { CommandFactory } from 'nest-commander';
import { CliModule } from './module';
import { CommandFactoryRunOptions } from 'nest-commander/src/command-factory.interface';
import { LoggerImpl } from '@beeker-tech/engine-core/adapters/_utils';
import { loadLocalConfig } from './adapters/_config';
import { checkDeviceAuthorization, displayInfo } from './adapters';

async function bootstrap() {
  const logger = new LoggerImpl();
  const commandFactoryRunOptions: CommandFactoryRunOptions = {
    logger,
    enablePositionalOptions: true,
  };
  const config = await loadLocalConfig();
  const isDeviceAuthorizationOptional =
    config?.openai_api_key && config?.openai_organization;

  if (isDeviceAuthorizationOptional) {
    await CommandFactory.run(CliModule, commandFactoryRunOptions);

    process.exitCode = 1;

    return;
  }

  displayInfo(
    `No local OpenAI configuration found in .beekconfig.yml. Authentication is needed before continuing.`
  );

  const isDeviceAuthorized = await checkDeviceAuthorization(logger);

  if (isDeviceAuthorized) {
    await CommandFactory.run(CliModule, commandFactoryRunOptions);
  }

  process.exitCode = 1;
}

bootstrap();
