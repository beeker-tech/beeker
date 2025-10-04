export interface FileSearch {
  searchDownwards(startPath: string, filter: string): Promise<string[] | null>;
}
