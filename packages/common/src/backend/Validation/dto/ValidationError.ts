import { SystemError } from 'common/backend/SystemError/dto/SystemError';
import { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';

export class ValidationError<
  Data extends Record<string, string[]> = Record<string, string[]>,
> extends SystemError<Data> {
  public constructor(data: Data, message: string) {
    super(CommonErrorCode.VALIDATION, message, data);
  }
}
