import { ApiProperty } from '@nestjs/swagger';

import { Role } from 'auth-backend/User/entities/User';

export class UserVerifyResponse {
  /**
   * ID.
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
  public role!: Role;
}
