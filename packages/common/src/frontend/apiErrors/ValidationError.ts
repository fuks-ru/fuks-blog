export class ValidationError extends Error {
  public constructor(public readonly data: Record<string, string[]>) {
    super('Ошибка валидации.');
  }
}
