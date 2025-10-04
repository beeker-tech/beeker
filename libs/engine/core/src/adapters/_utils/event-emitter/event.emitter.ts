import { EventEmitter } from '../../../domain/_utils';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export interface OnOptions {
  async?: boolean;
  promisify?: boolean;
  nextTick?: boolean;
  objectify?: boolean;
}

@Injectable()
export class EventEmitterImpl implements EventEmitter {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(event: string, ...values: unknown[]) {
    return this.eventEmitter.emit(event, ...values);
  }

  on(event: string, listener: (...values: []) => void) {
    this.eventEmitter.on(event, listener);

    return this;
  }
}
