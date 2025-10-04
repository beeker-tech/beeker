import { FileSystem } from '../../../../../_utils';
import { ActionRuleApplicationContextFile } from './context-file.model';

export class ActionRuleApplicationContextFileLoader {
  constructor(private readonly fileSystem: FileSystem) {}

  async loadMany(
    contextFiles: ActionRuleApplicationContextFile[] | null
  ): Promise<string[] | null> {
    if (!contextFiles) return null;

    const contextFilesDocuments: string[] = [];

    for (const contextFile of contextFiles) {
      const contextFileDocument: string | undefined =
        await this.fileSystem.readFile(contextFile.path);

      if (contextFileDocument) {
        contextFilesDocuments.push(contextFileDocument);
      }
    }

    return contextFilesDocuments;
  }
}
