export interface ActionVariablesValuesConfigFileSystemRepository {
  searchActionsConfigs(
    filter: string,
    startPath?: string
  ): Promise<string[] | null>;
}
