import { FileDiff } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import * as diff from 'diff';
import { ParsedDiff } from '@beeker-tech/engine-common';
const { structuredPatch, applyPatch } = diff;

@Injectable()
export class FileDiffImpl implements FileDiff {
  async structuredPatch(
    oldFileName: string,
    newFileName: string,
    oldString: string,
    newString: string,
    oldHeader?: string,
    newHeader?: string
  ): Promise<ParsedDiff> {
    return structuredPatch(
      oldFileName,
      newFileName,
      oldString,
      newString,
      oldHeader,
      newHeader
    );
  }

  async applyPatch(source: string, patch: ParsedDiff): Promise<string> {
    return applyPatch(source, patch);
  }
}
