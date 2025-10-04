import { UseCaseProxy } from '../../../_shared/use-case.proxy';
import { LoggerImpl } from '../../../../../adapters/_utils';
import { ActionSpecFileSystemRepositoryImpl } from '../../../../../adapters/infrastructure/engine';
import { GetActionSpecUseCase } from '../../../../../application/engine';

export const GET_ACTION_SPEC_USECASE_PROXY = 'GetActionSpecUseCaseProxy';

export const GetActionSpecUseCaseProvider = {
  inject: [LoggerImpl, ActionSpecFileSystemRepositoryImpl],
  provide: GET_ACTION_SPEC_USECASE_PROXY,
  useFactory: (
    loggerImpl: LoggerImpl,
    actionSpecFileSystemRepositoryImpl: ActionSpecFileSystemRepositoryImpl
  ) =>
    new UseCaseProxy(
      new GetActionSpecUseCase(loggerImpl, actionSpecFileSystemRepositoryImpl)
    ),
};
