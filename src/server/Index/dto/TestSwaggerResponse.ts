import { ApiProperty } from '@nestjs/swagger';

export class TestSwaggerResponse {
  /**
   * Id.
   */
  @ApiProperty()
  public id!: string;

  /**
   * Тестовое поле.
   */
  @ApiProperty()
  public test!: string;
}
