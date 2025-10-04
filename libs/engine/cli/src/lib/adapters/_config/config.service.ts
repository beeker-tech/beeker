import { Global, Injectable } from '@nestjs/common';
import { LocalConfigServiceImpl } from './local';
import { EnvironmentConfigServiceImpl } from './environment';
import { defaultConfiguration } from './config.default';

@Global()
@Injectable()
export class ConfigServiceImpl {
  constructor(
    private environmentConfigService: EnvironmentConfigServiceImpl,
    private localConfigService: LocalConfigServiceImpl
  ) {}

  getOpenAiOrganization(): string | undefined {
    return (
      this.localConfigService.getOpenAiOrganization() ||
      this.environmentConfigService.getOpenAiOrganization() ||
      defaultConfiguration.openai_organization
    );
  }

  getOpenAiApiKey(): string | undefined {
    return (
      this.localConfigService.getOpenAiApiKey() ||
      this.environmentConfigService.getOpenAiApiKey() ||
      defaultConfiguration.openai_api_key
    );
  }

  getOpenAiModel(): string | undefined {
    return (
      this.localConfigService.getOpenAiModel() ||
      this.environmentConfigService.getOpenAiModel() ||
      defaultConfiguration.openai_model
    );
  }

  getActionsRootDir(): string {
    return (
      this.localConfigService.getActionsRootDir() ||
      this.environmentConfigService.getActionsRootDir() ||
      defaultConfiguration.actions_root_dir
    );
  }
}
