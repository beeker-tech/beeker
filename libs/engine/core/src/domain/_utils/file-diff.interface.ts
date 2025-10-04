import { ParsedDiff } from '@beeker-tech/engine-common';

export interface FileDiff {
  structuredPatch(
    oldFileName: string,
    newFileName: string,
    oldString: string,
    newString: string,
    oldHeader?: string,
    newHeader?: string
  ): Promise<ParsedDiff>;

  applyPatch(source: string, patch: ParsedDiff): Promise<string>;
}
