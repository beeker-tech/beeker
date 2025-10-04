export interface Rule {
  // technical
  configPath: string | null;

  // content
  name: string;
  spec?: string;
}
