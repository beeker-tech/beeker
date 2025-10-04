import nodePath from 'path';
import { Injectable } from '@nestjs/common';
import { RuleMapper } from './rule.mapper';
import {
  GetRuleParam,
  Rule,
  RuleFileSystemRepository,
} from '../../../../domain/engine';
import { FileSystemImpl } from '../../../../adapters/_utils';
import { RuleTemplateNotFoundException } from './rule-template-not-found.exception';
import { RuleTemplateException } from './rule-template.exception';

@Injectable()
export class RuleFileSystemRepositoryImpl implements RuleFileSystemRepository {
  constructor(
    private readonly fileSystem: FileSystemImpl,
    private readonly ruleMapper: RuleMapper
  ) {}

  async getRule(param: GetRuleParam): Promise<Rule | null> {
    const { path, name } = param;
    const resolvedPath = nodePath.resolve(path);
    const document = await this.read(resolvedPath);

    return this.ruleMapper.toRule(path, name, document);
  }

  async read(path: string) {
    const document = await this.fileSystem
      .readFile(path)
      .catch((error: Error) => {
        if (error.message.includes('ENOENT')) {
          throw new RuleTemplateNotFoundException(path);
        }

        throw new RuleTemplateException(path, error);
      });

    return document;
  }
}
