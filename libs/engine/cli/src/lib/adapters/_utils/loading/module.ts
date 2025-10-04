import { Global, Module } from '@nestjs/common';
import { LoadingServiceImpl } from './loading.service';

@Global()
@Module({
  providers: [LoadingServiceImpl],
  exports: [LoadingServiceImpl],
})
export class LoadingModule {}
