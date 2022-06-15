import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class UserVerifyRequest {
  /**
   * Токен пользователя.
   */
  @IsJWT()
  @ApiProperty()
  public jwtToken!: string;
}
