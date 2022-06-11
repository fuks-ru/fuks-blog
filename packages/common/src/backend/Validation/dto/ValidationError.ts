import { SystemError } from 'common/backend/SystemError/dto/SystemError';
import { CommonErrorCode } from 'common/backend/SystemError/enums/CommonErrorCode';

export class ValidationError<
  Data extends Record<string, string[]>,
> extends SystemError<Data> {
  public constructor(data: Data) {
    super(CommonErrorCode.VALIDATION, 'Ошибка валидации.', data);
  }
}
