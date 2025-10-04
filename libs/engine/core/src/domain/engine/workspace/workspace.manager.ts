import { SourceControl, Logger } from '../../../domain/_utils';

export class WorkspaceManager {
  constructor(
    private readonly logger: Logger,
    private readonly sourceControl: SourceControl
  ) {}

  async clean(rootDir: string, ...pathspecs: string[]): Promise<void> {
    await this.sourceControl.clean(rootDir, ...pathspecs);

    this.logger.log(`WorkspaceManager`, `cleaned workspace ${rootDir}.`);
  }

  async restore(rootDir: string, ...pathspecs: string[]): Promise<void> {
    await this.sourceControl.restore(rootDir, ...pathspecs);

    this.logger.log(`WorkspaceManager`, `restored workspace ${rootDir}.`);
  }
}
