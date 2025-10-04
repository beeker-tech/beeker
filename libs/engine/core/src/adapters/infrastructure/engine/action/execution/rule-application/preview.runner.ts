import {
  EventEmitterImpl,
  FileDiffImpl,
  FileSystemImpl,
} from '../../../../../_utils';
import { Injectable } from '@nestjs/common';
import { ActionRuleApplicationPreviewRunner } from '../../../../../../domain/engine';
import { CompletionApiImpl } from '../../../../../api';
import { CompletionContextBuilderImpl } from './completion-context.builder';

@Injectable()
export class ActionRuleApplicationPreviewRunnerImpl extends ActionRuleApplicationPreviewRunner {
  constructor(
    eventEmitterImpl: EventEmitterImpl,
    completionApiImpl: CompletionApiImpl,
    completionContextBuilder: CompletionContextBuilderImpl,
    fileSystemImpl: FileSystemImpl,
    fileDiffImpl: FileDiffImpl
  ) {
    super(
      eventEmitterImpl,
      completionApiImpl,
      completionContextBuilder,
      fileSystemImpl,
      fileDiffImpl
    );
  }
}
