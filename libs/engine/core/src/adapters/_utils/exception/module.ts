import { Global, Module } from '@nestjs/common';
import { ExceptionsServiceImpl } from './exceptions.service';

@Global()
@Module({
  providers: [ExceptionsServiceImpl],
  exports: [ExceptionsServiceImpl],
})
export class ExceptionsModule {}
