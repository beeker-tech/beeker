import { UseCaseProxy } from '../../../_shared/use-case.proxy';
import { LoggerImpl } from '../../../../../adapters/_utils';
import {
  ActionPreviewRunnerImpl,
  ActionSpecFileSystemRepositoryImpl,
} from '../../../../../adapters/infrastructure/engine';
import { ActionExecutionBuilderImpl } from '../../../../../adapters/infrastructure';
import { PreviewActionExecutionUseCase } from '../../../../../application/engine';

export const PREVIEW_ACTION_EXECUTION_USECASE_PROXY =
  'PreviewActionExecutionUseCaseProxy';

export const PreviewActionExecutionUseCaseProvider = {
  inject: [
    LoggerImpl,
    ActionSpecFileSystemRepositoryImpl,
    ActionExecutionBuilderImpl,
    ActionPreviewRunnerImpl,
  ],
  provide: PREVIEW_ACTION_EXECUTION_USECASE_PROXY,
  useFactory: (
    loggerImpl: LoggerImpl,
    actionSpecFileSystemRepositoryImpl: ActionSpecFileSystemRepositoryImpl,
    actionExecutionBuilderImpl: ActionExecutionBuilderImpl,
    actionPreviewRunnerImpl: ActionPreviewRunnerImpl
  ) =>
    new UseCaseProxy(
      new PreviewActionExecutionUseCase(
        loggerImpl,
        actionSpecFileSystemRepositoryImpl,
        actionExecutionBuilderImpl,
        actionPreviewRunnerImpl
      )
    ),
};
