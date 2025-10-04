import { Injectable } from '@nestjs/common';
import { ActionRuleApplicationContextFileLoaderImpl } from './context/context-file.loader';
import { CompletionContextBuilder } from '../../../../../../domain/engine';

@Injectable()
export class CompletionContextBuilderImpl extends CompletionContextBuilder {
  constructor(contextFileLoader: ActionRuleApplicationContextFileLoaderImpl) {
    super(contextFileLoader);
  }
}
