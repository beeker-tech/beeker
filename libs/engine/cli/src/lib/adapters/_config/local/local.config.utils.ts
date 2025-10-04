import { searchUpdwards } from '../../_utils/file-search/file-search.utils';
import { readFile } from 'fs-extra';
import jsYaml from 'js-yaml';
import { BeekerConfig } from '../config.interface';

const CONFIG_FILE_NAME = '.beekconfig.yml';

export const loadLocalConfig = async () => {
  const configFilePath = await searchUpdwards(process.cwd(), CONFIG_FILE_NAME);

  if (!configFilePath) return;

  const configFile = await readFile(configFilePath, { encoding: 'utf-8' });

  const config = (await jsYaml.load(configFile)) as BeekerConfig;

  return config;
};
