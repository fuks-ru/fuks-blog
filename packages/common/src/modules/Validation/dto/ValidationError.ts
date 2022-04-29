import { SystemError } from 'common/modules/SystemError/dto/SystemError';
import { CommonErrorCode } from 'common/modules/SystemError/enums/CommonErrorCode';

export class ValidationError<
  Data extends Record<string, string[]>,
> extends SystemError<Data> {
  public constructor(data: Data) {
    super(CommonErrorCode.VALIDATION, 'Ошибка валидации.', data);
  }
}
