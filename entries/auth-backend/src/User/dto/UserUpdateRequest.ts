import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

import { Role } from 'auth-backend/User/entities/User';

export class UserUpdateRequest {
  /**
   * Email.
   */
  @ApiProperty()
  @IsOptional()
  @IsEmail(
    {},
    {
      message: i18nValidationMessage('incorrectEmailFormat'),
    },
  )
  public email?: string;

  /**
   * Роль.
   */
  @ApiProperty()
  @IsOptional()
  @IsEnum(Role, {
    message: i18nValidationMessage('incorrectRole'),
  })
  public role?: number;

  /**
   * Подтвержден ли пользователь по email.
   */
  @ApiProperty()
  @IsOptional()
  @IsBoolean({
    message: i18nValidationMessage('mustBeBoolean'),
  })
  public isConfirmed!: boolean;
}
