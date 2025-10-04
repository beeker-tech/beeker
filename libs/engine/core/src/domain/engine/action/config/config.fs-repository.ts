export interface ActionConfigFileSystemRepository {
  searchActionsConfigs(
    filter: string,
    startPath?: string
  ): Promise<string[] | null>;
}
