import { BusinessException } from '../../../../../domain/_shared';

export class ActionConfigNotFoundException extends BusinessException {
  constructor(path: string) {
    const message = `Cannot find action config file: ${path}`;
    super(message);
    this.name = 'ActionConfigNotFoundException';
  }
}
