export interface EventEmitter {
  emit(event: string, ...values: unknown[]): boolean;
  on(event: string, listener: (...values: []) => void): this;
}
