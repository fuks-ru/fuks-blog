import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import requestContext from 'request-context';

import { REQUEST_CONTEXT_ID, REQUEST } from '../utils/constants';

/**
 * Контекст запроса.
 */
interface IRequestContext {
  /**
   * Id сессии.
   */
  [REQUEST]: Request;
}

@Injectable()
export class RequestRefService {
  public getRequest(): Request {
    const context = requestContext.get<IRequestContext>(REQUEST_CONTEXT_ID);

    return context[REQUEST];
  }
}
