import { ApiProperty } from '@nestjs/swagger';

import { UserResponse } from 'auth-backend/User/dto/UserResponse';

export class UserDetailResponse extends UserResponse {
  /**
   * Время добавления.
   */
  @ApiProperty()
  public createdAt!: Date;

  /**
   * Время обновления.
   */
  @ApiProperty()
  public updatedAt!: Date;
}
