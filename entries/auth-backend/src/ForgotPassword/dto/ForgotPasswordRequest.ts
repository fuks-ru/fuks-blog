import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class ForgotPasswordRequest {
  /**
   * Email.
   */
  @IsEmail(
    {},
    {
      message: 'Введите корректный email',
    },
  )
  public email!: string;

  /**
   * Путь для перенаправления.
   */
  @ApiProperty()
  @IsOptional()
  public redirectFrom?: string;
}
