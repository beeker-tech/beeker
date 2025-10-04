import { Hunk } from './hunk.dto';

export interface ParsedDiff {
  index?: string;
  oldFileName?: string;
  newFileName?: string;
  oldHeader?: string;
  newHeader?: string;
  hunks: Hunk[];
}
