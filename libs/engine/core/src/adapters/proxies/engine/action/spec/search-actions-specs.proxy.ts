import { UseCaseProxy } from '../../../_shared/use-case.proxy';
import { LoggerImpl } from '../../../../_utils';
import {
  ActionConfigFileSystemRepositoryImpl,
  ActionSpecFileSystemRepositoryImpl,
} from '../../../../infrastructure/engine';
import { SearchActionsSpecsUseCase } from '../../../../../application/engine';

export const SEARCH_ACTIONS_SPECS_USECASE_PROXY =
  'SearchActionsSpecsUseCaseProxy';

export const SearchActionsSpecsUseCaseProvider = {
  inject: [
    LoggerImpl,
    ActionConfigFileSystemRepositoryImpl,
    ActionSpecFileSystemRepositoryImpl,
  ],
  provide: SEARCH_ACTIONS_SPECS_USECASE_PROXY,
  useFactory: (
    loggerImpl: LoggerImpl,
    actionConfigFileSystemRepositoryImpl: ActionConfigFileSystemRepositoryImpl,
    actionSpecFileSystemRepositoryImpl: ActionSpecFileSystemRepositoryImpl
  ) =>
    new UseCaseProxy(
      new SearchActionsSpecsUseCase(
        loggerImpl,
        actionConfigFileSystemRepositoryImpl,
        actionSpecFileSystemRepositoryImpl
      )
    ),
};
