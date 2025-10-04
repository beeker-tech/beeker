export interface YamlParser {
  load<T = unknown>(yaml: string, options?: unknown): Promise<T>;
  loadAll<T = unknown>(
    yaml: string,
    iterator?: null | undefined,
    options?: unknown
  ): Promise<T[]>;
}
