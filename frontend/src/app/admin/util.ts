export function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x);
}

export interface Action<T, A> {
  item: T;
  action: A;
  onSuccess?: ($event?: any) => void;
  onError?: ($event?: any) => void;
}
