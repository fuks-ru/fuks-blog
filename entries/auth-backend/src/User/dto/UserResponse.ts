import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  /**
   * Id.
   */
  @ApiProperty()
  public id!: string;

  /**
   * Email.
   */
  @ApiProperty()
  public email!: string;

  /**
   * Роль.
   */
  @ApiProperty()
  public role!: number;

  /**
   * Подтвержден ли пользователь по email.
   */
  @ApiProperty()
  public isConfirmed!: boolean;
}
