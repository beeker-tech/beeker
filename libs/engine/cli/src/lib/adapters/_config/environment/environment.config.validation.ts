import { plainToInstance } from 'class-transformer';
import { IsEnum, IsOptional, IsString, validateSync } from 'class-validator';
import { Environment } from './environment.interfaces';
import { LogLevel } from '@beeker-tech/engine-core/adapters/_utils';

class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsOptional()
  @IsEnum(LogLevel)
  LOG_LEVEL: LogLevel;

  @IsOptional()
  @IsString()
  CLI_NAME: string;

  @IsOptional()
  @IsString()
  GENIUS_API_URL: string;

  @IsOptional()
  @IsString()
  BEEKER_ACTIONS_ROOT_DIR: string;
  @IsOptional()
  @IsString()
  BEEKER_OPENAI_ORGANIZATION: string;
  @IsOptional()
  @IsString()
  BEEKER_OPENAI_API_KEY: string;
  @IsOptional()
  @IsString()
  BEEKER_OPENAI_MODEL: string;

  @IsOptional()
  @IsString()
  AUTH0_ISSUER_BASE_URL: string;
  @IsOptional()
  @IsString()
  AUTH0_CLIENT_ID: string;
  @IsOptional()
  @IsString()
  AUTH0_SCOPE: string;
  @IsOptional()
  @IsString()
  AUTH0_AUDIENCE: string;

  constructor(
    NODE_ENV: Environment,

    LOG_LEVEL: LogLevel,

    CLI_NAME: string,

    GENIUS_API_URL: string,

    BEEKER_ACTIONS_ROOT_DIR: string,
    BEEKER_OPENAI_ORGANIZATION: string,
    BEEKER_OPENAI_API_KEY: string,
    BEEKER_OPENAI_MODEL: string,

    AUTH0_ISSUER_BASE_URL: string,
    AUTH0_CLIENT_ID: string,
    AUTH0_SCOPE: string,
    AUTH0_AUDIENCE: string
  ) {
    this.NODE_ENV = NODE_ENV;

    this.LOG_LEVEL = LOG_LEVEL;

    this.CLI_NAME = CLI_NAME;

    this.GENIUS_API_URL = GENIUS_API_URL;

    this.BEEKER_ACTIONS_ROOT_DIR = BEEKER_ACTIONS_ROOT_DIR;
    this.BEEKER_OPENAI_ORGANIZATION = BEEKER_OPENAI_ORGANIZATION;
    this.BEEKER_OPENAI_API_KEY = BEEKER_OPENAI_API_KEY;
    this.BEEKER_OPENAI_MODEL = BEEKER_OPENAI_MODEL;

    this.AUTH0_ISSUER_BASE_URL = AUTH0_ISSUER_BASE_URL;
    this.AUTH0_CLIENT_ID = AUTH0_CLIENT_ID;
    this.AUTH0_SCOPE = AUTH0_SCOPE;
    this.AUTH0_AUDIENCE = AUTH0_AUDIENCE;
  }
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());

  return validatedConfig;
}
