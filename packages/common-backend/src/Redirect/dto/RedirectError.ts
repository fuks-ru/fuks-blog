import { IRedirectData } from '@difuks/common';

export class RedirectError extends Error {
  public constructor(public readonly data: IRedirectData) {
    super('Redirect');
  }
}
