import { UseCaseProxy } from '../../../_shared/use-case.proxy';
import { LoggerImpl } from '../../../../../adapters/_utils';
import { ActionSpecFileSystemRepositoryImpl } from '../../../../../adapters/infrastructure/engine';
import { FindActionsSpecsUseCase } from '../../../../../application/engine';

export const FIND_ACTIONS_SPECS_USECASE_PROXY = 'FindActionsSpecsUseCaseProxy';

export const FindActionsSpecsUseCaseProvider = {
  inject: [LoggerImpl, ActionSpecFileSystemRepositoryImpl],
  provide: FIND_ACTIONS_SPECS_USECASE_PROXY,
  useFactory: (
    loggerImpl: LoggerImpl,
    actionSpecFileSystemRepositoryImpl: ActionSpecFileSystemRepositoryImpl
  ) =>
    new UseCaseProxy(
      new FindActionsSpecsUseCase(
        loggerImpl,
        actionSpecFileSystemRepositoryImpl
      )
    ),
};
