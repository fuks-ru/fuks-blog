import { ApiProperty } from '@nestjs/swagger';

export class TestSwaggerRequest {
  /**
   * Название.
   */
  @ApiProperty()
  public name!: string;
}
