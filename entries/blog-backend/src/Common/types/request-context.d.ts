declare module 'request-context' {
  import type { Type } from '@nestjs/common/interfaces/type.interface';

  const get: <Value>(id: string) => Value;
  const set: <Value>(id: string, value: Value) => void;
  const middleware: (id: string) => Type;

  /**
   * Описание типов для библиотеки request-context.
   */
  export { get, set, middleware };
}
