import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  /**
   * ID.
   */
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  public id!: string;

  /**
   * Название.
   */
  @Column()
  @ApiProperty()
  public name!: string;
}
