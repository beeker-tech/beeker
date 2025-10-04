import { NotFoundException } from '../../../../domain/_shared';

export class PathNotFoundException extends NotFoundException {
  constructor(path?: string) {
    const pathNamePart = (path && "'" + path + "'") || '';
    const message = `Path ${pathNamePart} not found.`;
    super(message);
    this.name = 'PathNotFoundException';
  }
}
