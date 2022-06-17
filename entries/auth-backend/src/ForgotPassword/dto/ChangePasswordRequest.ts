import { Match } from '@difuks/common/dist';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, ValidateIf } from 'class-validator';

export class ChangePasswordRequest {
  /**
   * Код восстановления пароля.
   */
  @IsString({
    message: 'Некорректный код восстановления',
  })
  public forgotPasswordCode!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  @MinLength(8, {
    message: 'Минимальная длина пароля: $constraint1 символов',
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
    message: 'Пароли должны совпадать',
  })
  public repeatPassword!: string;
}
