import { Module, forwardRef } from '@nestjs/common';
import { RootCommandRunner } from './command-runner';
import { SelectCommandFromListQuestion } from './select-command.question';
import { ActionModule } from '../engine/action/module';

@Module({
  imports: [forwardRef(() => ActionModule)],
  providers: [RootCommandRunner, SelectCommandFromListQuestion],
  exports: [RootCommandRunner],
})
export class RootModule {}
