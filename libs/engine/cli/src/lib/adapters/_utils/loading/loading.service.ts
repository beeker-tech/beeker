import { Injectable } from '@nestjs/common';
import { dots as spinner } from 'cli-spinners';
import logUpdate from 'log-update';

const { frames, interval } = spinner;

@Injectable()
export class LoadingServiceImpl {
  private interval?: NodeJS.Timer;
  private i = 0;

  public startLoading(message?: string) {
    if (!interval) return;

    this.interval = setInterval(() => {
      this.i = ++this.i % frames.length;
      const frame = frames[this.i];

      if (!frame) return;

      logUpdate(`${frame} ${message}`);
    }, interval);
  }

  public stopLoading() {
    if (!this.interval) return;

    clearInterval(this.interval);
    this.i = 0;

    logUpdate('');
  }
}
