import { Match } from '@fuks-ru/common-backend';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, ValidateIf } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class ChangePasswordRequest {
  /**
   * Код восстановления пароля.
   */
  @IsString({
    message: i18nValidationMessage('incorrectForgotPasswordCode'),
  })
  public forgotPasswordCode!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  @MinLength(8, {
    message: i18nValidationMessage('minLength'),
  })
  public password!: string;

  /**
   * Повтор пароля.
   */
  @ApiProperty()
  @ValidateIf(
    (o: Partial<ChangePasswordRequest>) =>
      !!o.password && o.password.length >= 8,
  )
  @Match('password', {
    message: i18nValidationMessage('passwordEqual'),
  })
  public repeatPassword!: string;
}
