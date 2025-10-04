export interface Event<T = unknown> {
  name: string;
  data: T;
}
