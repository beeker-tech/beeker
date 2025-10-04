export interface Hunk {
  oldStart: number;
  oldLines: number;
  newStart: number;
  newLines: number;
  lines: string[];
  // Line Delimiters is only returned by parsePatch()
  linedelimiters?: string[];
}
