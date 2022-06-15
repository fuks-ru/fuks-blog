import { ApiProperty } from '@nestjs/swagger';

export class GoogleLoginRequest {
  /**
   * Токен для авторизации.
   */
  @ApiProperty()
  public accessToken!: string;

  /**
   * Путь для перенаправления.
   */
  @ApiProperty()
  public redirectFrom?: string;
}
