import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, ValidateIf, IsOptional } from 'class-validator';
import { Match } from '@fuks-ru/common-backend';
import { i18nValidationMessage } from 'nestjs-i18n';

export class BasicRegisterRequest {
  /**
   * Email.
   */
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('incorrectEmailFormat'),
    },
  )
  public email!: string;

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
    (o: Partial<BasicRegisterRequest>) =>
      !!o.password && o.password.length >= 8,
  )
  @Match('password', {
    message: i18nValidationMessage('passwordEqual'),
  })
  public repeatPassword!: string;

  /**
   * Путь для перенаправления.
   */
  @ApiProperty()
  @IsOptional()
  public redirectFrom?: string;
}
