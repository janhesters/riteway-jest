declare module 'riteway' {
  export function assert<T>(assertion: Assertion<T>): void;

  interface Assertion<T> {
    readonly given: any;
    readonly should: string;
    readonly actual: T;
    readonly expected: T;
  }
}
