import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CompletionApiImpl } from './completion.api';
import { DEFAULT_CONFIGURATION } from '../../_config';

const baseURL =
  process.env['GENIUS_API_URL'] || DEFAULT_CONFIGURATION.GENIUS_API_URL;

@Module({
  imports: [
    HttpModule.register({
      baseURL,
    }),
  ],
  providers: [CompletionApiImpl],
  exports: [CompletionApiImpl],
})
export class GeniusApiModule {}
