import { ApiProperty } from '@nestjs/swagger';

export class GoogleAuthRequest {
  /**
   * Токен для авторизации.
   */
  @ApiProperty()
  public accessToken!: string;
}
