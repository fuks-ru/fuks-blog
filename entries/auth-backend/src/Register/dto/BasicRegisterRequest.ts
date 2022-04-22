import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class BasicRegisterRequest {
  /**
   * Email.
   */
  @ApiProperty()
  @IsEmail({
    message: 'Введите корректный email',
  })
  public email!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  @MinLength(8, {
    message: 'Минимальная длина пароля: $constraint1 символов',
  })
  public password!: string;
}
