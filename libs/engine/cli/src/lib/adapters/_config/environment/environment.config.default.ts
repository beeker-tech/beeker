import { ConfigFactory } from '@nestjs/config';
import { Environment } from './environment.interfaces';
import { LogLevel } from '@beeker-tech/engine-core/adapters/_utils';
import { DEFAULT_CONFIGURATION as CORE_DEFAULT_CONFIGURATION } from '@beeker-tech/engine-core';

export const DEFAULT_CONFIGURATION = {
  NODE_ENV: Environment.Production,

  LOG_LEVEL: LogLevel.error,

  CLI_NAME: 'beeker-engine-cli',

  GENIUS_API_URL: CORE_DEFAULT_CONFIGURATION.GENIUS_API_URL,

  AUTH0_ISSUER_BASE_URL: 'https://beeker.eu.auth0.com/',
  AUTH0_CLIENT_ID: 'D3rlG3lWYxV3vyKr2tP1zfliARINlugR',
  AUTH0_SCOPE: 'openid profile offline_access',
  AUTH0_AUDIENCE: 'https://api.beeker.tech',
};

export const defaultConfigFactory: ConfigFactory = () => {
  return DEFAULT_CONFIGURATION;
};
