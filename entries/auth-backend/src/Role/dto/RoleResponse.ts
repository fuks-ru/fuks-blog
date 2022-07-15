import { ApiProperty } from '@nestjs/swagger';

export class RoleResponse {
  /**
   * Id.
   */
  @ApiProperty()
  // TODO разобраться почему Enum выдает string'и https://github.com/nestjs/swagger/pull/1898
  public id!: number;

  /**
   * Email.
   */
  @ApiProperty()
  public name!: string;
}
