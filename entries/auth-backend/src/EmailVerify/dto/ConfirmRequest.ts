import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ConfirmRequest {
  /**
   * Код подтверждения.
   */
  @ApiProperty()
  @IsString()
  public confirmCode!: string;
}
