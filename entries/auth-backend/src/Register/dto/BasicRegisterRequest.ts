import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, ValidateIf } from 'class-validator';
import { Match } from '@difuks/common';

export class BasicRegisterRequest {
  /**
   * Email.
   */
  @ApiProperty()
  @IsEmail(
    {},
    {
      message: 'Введите корректный email',
    },
  )
  public email!: string;

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
    (o: Partial<BasicRegisterRequest>) =>
      !!o.password && o.password.length >= 8,
  )
  @Match('password', {
    message: 'Пароли должны совпадать',
  })
  public repeatPassword!: string;

  /**
   * Путь для перенаправления.
   */
  @ApiProperty()
  public redirectFrom?: string;
}
