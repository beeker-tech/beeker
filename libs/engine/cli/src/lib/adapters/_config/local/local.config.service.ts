import { Global, Injectable } from '@nestjs/common';
import { BeekerConfig } from '../config.interface';
import { loadLocalConfig } from './local.config.utils';

@Global()
@Injectable()
export class LocalConfigServiceImpl {
  private localConfig?: BeekerConfig;

  constructor() {
    this.initConfig();
  }

  async initConfig() {
    const config = await loadLocalConfig();

    this.localConfig = config;
  }

  getActionsRootDir(): string | undefined {
    return this.localConfig?.actions_root_dir;
  }

  getOpenAiOrganization(): string | undefined {
    return this.localConfig?.openai_organization;
  }

  getOpenAiApiKey(): string | undefined {
    return this.localConfig?.openai_api_key;
  }

  getOpenAiModel(): string | undefined {
    return this.localConfig?.openai_model;
  }
}
