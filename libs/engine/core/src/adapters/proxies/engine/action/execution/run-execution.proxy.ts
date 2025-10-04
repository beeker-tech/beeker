import { UseCaseProxy } from '../../../_shared/use-case.proxy';
import { EventEmitterImpl, LoggerImpl } from '../../../../../adapters/_utils';
import { ExecuteActionUseCase } from '../../../../../application/engine';
import {
  ActionExecutionBuilderImpl,
  ActionExecutionRunnerImpl,
  ActionSpecFileSystemRepositoryImpl,
} from '../../../../../adapters/infrastructure/engine';

export const EXECUTE_ACTION_USECASE_PROXY = 'ExecuteActionUseCaseProvider';

export const ExecuteActionUseCaseProvider = {
  inject: [
    LoggerImpl,
    EventEmitterImpl,
    ActionSpecFileSystemRepositoryImpl,
    ActionExecutionBuilderImpl,
    ActionExecutionRunnerImpl,
  ],
  provide: EXECUTE_ACTION_USECASE_PROXY,
  useFactory: (
    loggerImpl: LoggerImpl,
    eventEmitterImpl: EventEmitterImpl,
    actionSpecFileSystemRepositoryImpl: ActionSpecFileSystemRepositoryImpl,
    actionExecutionBuilderImpl: ActionExecutionBuilderImpl,
    actionExecutionRunnerImpl: ActionExecutionRunnerImpl
  ) =>
    new UseCaseProxy(
      new ExecuteActionUseCase(
        loggerImpl,
        eventEmitterImpl,
        actionSpecFileSystemRepositoryImpl,
        actionExecutionBuilderImpl,
        actionExecutionRunnerImpl
      )
    ),
};
