export class OPError {
  error: string;
  error_description: string;
  name: string;

  constructor(error: string, error_description: string, name: string) {
    this.error = error;
    this.error_description = error_description;
    this.name = name;
  }
}
