import { IRedirectData } from '@fuks-ru/common';

export class RedirectError extends Error {
  public constructor(public readonly data: IRedirectData) {
    super('Redirect');
  }
}
