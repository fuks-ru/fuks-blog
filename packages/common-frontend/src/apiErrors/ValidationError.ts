export class ValidationError extends Error {
  public constructor(
    public readonly data: Record<string, string[]>,
    message: string,
  ) {
    super(message);
  }
}
