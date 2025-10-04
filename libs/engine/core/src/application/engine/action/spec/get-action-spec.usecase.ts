import { Logger } from '../../../../domain/_utils';
import {
  ActionSpec,
  ActionSpecFileSystemRepository,
} from '../../../../domain/engine';

export class GetActionSpecUseCase {
  constructor(
    private readonly logger: Logger,
    private readonly actionSpecFileSystemRepository: ActionSpecFileSystemRepository
  ) {}

  async execute(path: string, rootDir?: string): Promise<ActionSpec> {
    const actionSpec: ActionSpec =
      await this.actionSpecFileSystemRepository.getActionSpec(path, rootDir);

    this.logger.verbose(
      `GetActionSpecUseCase`,
      `found action spec ${JSON.stringify(actionSpec)}`
    );

    return actionSpec;
  }
}
