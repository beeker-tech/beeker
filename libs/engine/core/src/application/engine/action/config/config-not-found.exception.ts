import { NotFoundException } from '../../../../domain/_shared';

export class ActionConfigNotFoundException extends NotFoundException {
  constructor(path: string) {
    const message = `No action config found at path '${path}'`;
    super(message);
    this.name = 'ActionConfigNotFoundException';
  }
}
