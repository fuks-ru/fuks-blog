export class SystemError<Data = unknown> extends Error {
  public constructor(
    public readonly code: number | string,
    public override readonly message: string,
    public readonly data?: Data,
  ) {
    super(message);
  }
}
