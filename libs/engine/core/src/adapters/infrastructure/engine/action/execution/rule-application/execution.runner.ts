import {
  EventEmitterImpl,
  FileDiffImpl,
  FileSystemImpl,
} from '../../../../../_utils';
import { Injectable } from '@nestjs/common';
import { ActionRuleApplicationExecutionRunner } from '../../../../../../domain/engine';
import { CompletionApiImpl } from '../../../../../api';
import { CompletionContextBuilderImpl } from './completion-context.builder';

@Injectable()
export class ActionRuleApplicationExecutionRunnerImpl extends ActionRuleApplicationExecutionRunner {
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
