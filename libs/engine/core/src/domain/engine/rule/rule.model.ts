export class Rule {
  // technical
  configPath: string | null;

  // content
  name: string;
  spec: string;

  constructor(configPath: string | null, name: string, spec: string) {
    this.configPath = configPath;
    this.name = name;
    this.spec = spec;
  }
}
