/**
 * Данные для редиректа.
 */
export interface IRedirectData {
  /**
   * Страница.
   */
  location: string;
}

export class RedirectError extends Error {
  public constructor(public readonly data: IRedirectData) {
    super('Redirect');
  }
}
