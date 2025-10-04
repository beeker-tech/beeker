import { YamlParser } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import jsYaml, { LoadOptions } from 'js-yaml';

@Injectable()
export class YamlParserImpl implements YamlParser {
  async load<T = unknown>(yaml: string, options?: LoadOptions): Promise<T> {
    return jsYaml.load(yaml, options) as T;
  }

  async loadAll<T = unknown>(
    yaml: string,
    iterator?: null | undefined,
    options?: LoadOptions
  ): Promise<T[]> {
    return jsYaml.loadAll(yaml, iterator, options) as T[];
  }
}
