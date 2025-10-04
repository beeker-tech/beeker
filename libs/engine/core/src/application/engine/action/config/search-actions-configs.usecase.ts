import { Logger } from '../../../../domain/_utils';
import { ActionConfigFileSystemRepository } from '../../../../domain/engine';
import { PathNotFoundException } from './path-not-found.exception';
import { SearchActionConfigFileParam } from '@beeker-tech/engine-common';

export class SearchActionsConfigsUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly actionConfigFileSystemRepository: ActionConfigFileSystemRepository
  ) {}

  async execute(param: SearchActionConfigFileParam): Promise<string[]> {
    const { startPath, filter } = param;
    const actionsPaths: string[] | null =
      await this.actionConfigFileSystemRepository.searchActionsConfigs(
        filter,
        startPath
      );

    if (!actionsPaths) throw new PathNotFoundException(startPath);

    this.logger.verbose(
      `SearchActionsFilesUseCase`,
      `found Actions files ${JSON.stringify(actionsPaths)}`
    );

    return actionsPaths;
  }
}
