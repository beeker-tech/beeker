export interface SourceControl {
  clean(baseDir?: string, ...pathspecs: string[]): Promise<unknown>;
  restore(baseDir?: string, ...pathspecs: string[]): Promise<string>;
}
