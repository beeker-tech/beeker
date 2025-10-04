import { ActionRuleApplicationContextFile } from './context/context-file.model';
import { ActionRuleApplicationContextFileLoader } from './context/context-file.loader';
import { CodeCompletionContextParam } from '@beeker-tech/genius-client';

export class CompletionContextBuilder {
  constructor(
    private readonly contextFileLoader: ActionRuleApplicationContextFileLoader
  ) {}

  async buildMany(
    contextFiles: ActionRuleApplicationContextFile[] | null
  ): Promise<CodeCompletionContextParam[] | null | undefined> {
    if (!contextFiles) return null;

    const contextsDocuments = await this.contextFileLoader.loadMany(
      contextFiles
    );

    const contexts = contextsDocuments?.map(
      (contextDocument: string, index: number) => {
        const param: CodeCompletionContextParam = {
          name: contextFiles[index].name,
          prompt: contextDocument,
        };

        return param;
      }
    );

    return contexts;
  }
}
