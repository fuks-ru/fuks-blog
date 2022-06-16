import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { ConfirmCode } from 'auth-backend/EmailVerify/entities/ConfirmCode';

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
   * Подтвержден ли пользователь по email.
   */
  @Column({
    default: false,
  })
  public isConfirmed!: boolean;

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

  /**
   * Коды подтверждения.
   */
  @OneToOne('ConfirmCode', 'user', {
    onDelete: 'CASCADE',
  })
  public confirmCode?: ConfirmCode;
}
