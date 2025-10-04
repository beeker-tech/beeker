import { UseCaseProxy } from '../../../_shared/use-case.proxy';
import { LoggerImpl } from '../../../../../adapters/_utils';
import { ActionConfigFileSystemRepositoryImpl } from '../../../../../adapters/infrastructure/engine';
import { SearchActionsConfigsUseCase } from '../../../../../application/engine';

export const SEARCH_ACTIONS_CONFIGS_USECASE_PROXY =
  'SearchActionsConfigsUseCaseProxy';

export const SearchActionsConfigsUseCaseProvider = {
  inject: [LoggerImpl, ActionConfigFileSystemRepositoryImpl],
  provide: SEARCH_ACTIONS_CONFIGS_USECASE_PROXY,
  useFactory: (
    loggerImpl: LoggerImpl,
    actionConfigFileSystemRepositoryImpl: ActionConfigFileSystemRepositoryImpl
  ) =>
    new UseCaseProxy(
      new SearchActionsConfigsUseCase(
        loggerImpl,
        actionConfigFileSystemRepositoryImpl
      )
    ),
};
