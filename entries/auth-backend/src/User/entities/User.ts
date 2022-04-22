import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Описывает роли пользователя.
 */
export enum Role {
  ADMIN = 0,
  USER = 1,
}

@Entity({ name: 'users' })
export class User {
  /**
   * ID.
   */
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  /**
   * Email.
   */
  @Column({
    unique: true,
  })
  public email!: string;

  /**
   * Захешированный пароль.
   */
  @Column()
  public hashedPassword!: string;

  /**
   * Роль.
   */
  @Column()
  public role!: Role;
}
