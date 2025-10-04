import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Injectable()
export class EnvironmentConfigServiceImpl {
  constructor(private configService: ConfigService) {}

  getGeniusApiUrl(): string {
    const DEFAULT_GENIUS_API_URL = 'https://genius.api.beeker.tech/api_v1';
    const ENV_GENIUS_API_URL = this.configService.get<string>('GENIUS_API_URL');

    return ENV_GENIUS_API_URL || DEFAULT_GENIUS_API_URL;
  }

  getActionsRootDir(): string | undefined {
    return this.configService.get<string>('BEEKER_ACTIONS_ROOT_DIR');
  }

  getOpenAiOrganization(): string | undefined {
    return this.configService.get<string>('BEEKER_OPENAI_ORGANIZATION');
  }

  getOpenAiApiKey(): string | undefined {
    return this.configService.get<string>('BEEKER_OPENAI_API_KEY');
  }

  getOpenAiModel(): string | undefined {
    return this.configService.get<string>('BEEKER_OPENAI_MODEL');
  }
}
