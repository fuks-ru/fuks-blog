import { ApiProperty } from '@nestjs/swagger';

export class Category {
  /**
   * Id.
   */
  @ApiProperty()
  public id!: number;

  /**
   * Название.
   */
  @ApiProperty()
  public name!: string;
}
