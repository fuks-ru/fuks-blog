import { ApiProperty } from '@nestjs/swagger';

export class Category {
  /**
   * Id.
   */
  @ApiProperty()
  public id!: string;

  /**
   * Название.
   */
  @ApiProperty()
  public name!: string;
}
