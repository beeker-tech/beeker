import { Injectable } from '@nestjs/common';
import { ActionVariablesValuesConfigFileSystemRepository } from '../../../../../../../domain/engine';
import { FileSearchImpl } from '../../../../../../_utils';

const ENGINE_WORK_DIR = `${process.env['ENGINE_WORK_DIR']}`;

@Injectable()
export class ActionVariablesValuesConfigFileSystemRepositoryImpl
  implements ActionVariablesValuesConfigFileSystemRepository
{
  constructor(private readonly fileSearch: FileSearchImpl) {}

  async searchActionsConfigs(
    filter: string,
    startPath?: string
  ): Promise<string[] | null> {
    const searchStartPath = (startPath && startPath) || ENGINE_WORK_DIR;

    const files = await this.fileSearch.searchDownwards(
      searchStartPath,
      filter
    );

    const filesWithoutStartPath = this.formatActionConfigs(
      searchStartPath,
      files
    );

    return filesWithoutStartPath;
  }

  private formatActionConfigs(startPath: string, files: string[] | null) {
    if (!files) return null;

    return files.map((file) => this.formatActionConfig(startPath, file));
  }

  private formatActionConfig(startPath: string, file: string) {
    return file.replace(`${startPath}/`, '');
  }
}
