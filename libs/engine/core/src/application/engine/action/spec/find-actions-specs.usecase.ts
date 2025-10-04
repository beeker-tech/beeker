import { Logger } from '../../../../domain/_utils';
import {
  ActionSpec,
  ActionSpecFileSystemRepository,
} from '../../../../domain/engine';
import { FindActionsSpecsParam } from '@beeker-tech/engine-common';

export class FindActionsSpecsUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly actionSpecFileSystemRepository: ActionSpecFileSystemRepository
  ) {}

  async execute(param: FindActionsSpecsParam): Promise<ActionSpec[]> {
    const { paths, rootDir } = param;
    const actionsSpecs: ActionSpec[] =
      await this.actionSpecFileSystemRepository.findActionsSpecs(
        paths,
        rootDir
      );

    this.logger.verbose(
      `FindActionsSpecsUseCase`,
      `found action specs ${JSON.stringify(actionsSpecs)}`
    );

    return actionsSpecs;
  }
}
