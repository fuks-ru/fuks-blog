import { ApiProperty } from '@nestjs/swagger';

export class BasicAuthRequest {
  /**
   * Email.
   */
  @ApiProperty()
  public email!: string;

  /**
   * Пароль.
   */
  @ApiProperty()
  public password!: string;
}
