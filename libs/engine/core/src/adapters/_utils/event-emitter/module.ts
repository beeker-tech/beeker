import { EventEmitterModule as NestEventEmitterModule } from '@nestjs/event-emitter';
import { Global, Module } from '@nestjs/common';
import { EventEmitterImpl } from './event.emitter';

@Global()
@Module({
  imports: [
    NestEventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  providers: [EventEmitterImpl],
  exports: [EventEmitterImpl],
})
export class EventEmitterModule {}
