import { BeekerConfig } from './config.interface';

export const defaultConfiguration: BeekerConfig = {
  actions_root_dir: process.cwd(),
  openai_organization: undefined,
  openai_api_key: undefined,
  openai_model: 'gpt-4o',
};
