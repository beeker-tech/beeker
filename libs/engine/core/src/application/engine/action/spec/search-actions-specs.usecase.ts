import { Logger } from '../../../../domain/_utils';
import {
  ActionConfigFileSystemRepository,
  ActionSpec,
  ActionSpecFileSystemRepository,
} from '../../../../domain/engine';
import { SearchActionsSpecsParam } from '@beeker-tech/engine-common';
import { PathNotFoundException } from '../config';

export class SearchActionsSpecsUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly actionConfigFileSystemRepository: ActionConfigFileSystemRepository,
    private readonly actionSpecFileSystemRepository: ActionSpecFileSystemRepository
  ) {}

  async execute(param: SearchActionsSpecsParam): Promise<ActionSpec[]> {
    const { filter, startPath } = param;

    const paths: string[] | null =
      await this.actionConfigFileSystemRepository.searchActionsConfigs(
        filter,
        startPath
      );

    if (!paths) throw new PathNotFoundException(startPath);

    const actionsSpecs: ActionSpec[] =
      await this.actionSpecFileSystemRepository.findActionsSpecs(
        paths,
        startPath
      );

    this.logger.verbose(
      `SearchActionsSpecsUseCase`,
      `found action specs ${JSON.stringify(actionsSpecs)}`
    );

    return actionsSpecs;
  }
}
