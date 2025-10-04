import { Injectable } from '@nestjs/common';
import { FileSystemImpl } from '../../../../../../_utils';
import { ActionRuleApplicationContextFileLoader } from '../../../../../../../domain/engine';

@Injectable()
export class ActionRuleApplicationContextFileLoaderImpl extends ActionRuleApplicationContextFileLoader {
  constructor(fileSystemImpl: FileSystemImpl) {
    super(fileSystemImpl);
  }
}
