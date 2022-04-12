declare module 'request-context' {
  const get: <Value>(id: string) => Value;
  const set: <Value>(id: string, value: Value) => void;
  const middleware: (
    id: string,
  ) => import('@nestjs/common/interfaces/type.interface').Type;

  /**
   * Описание типов для библиотеки request-context.
   */
  export { get, set, middleware };
}
