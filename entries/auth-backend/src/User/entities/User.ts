import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import type { ConfirmCode } from 'auth-backend/Register/modules/EmailVerify/entities/ConfirmCode';
import type { ForgotPasswordCode } from 'auth-backend/ForgotPassword/entities/ForgotPasswordCode';

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
  @ApiProperty()
  public id!: string;

  /**
   * Email.
   */
  @Column({
    unique: true,
  })
  @ApiProperty()
  public email!: string;

  /**
   * Подтвержден ли пользователь по email.
   */
  @Column({
    default: false,
  })
  @ApiProperty()
  public isConfirmed!: boolean;

  /**
   * Захешированный пароль.
   */
  @Column()
  @ApiProperty()
  public hashedPassword!: string;

  /**
   * Роль.
   */
  @Column()
  @ApiProperty()
  public role!: Role;

  /**
   * Коды подтверждения.
   */
  @OneToOne('ConfirmCode', 'user', {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  public confirmCode?: ConfirmCode;

  /**
   * Коды восстановления пароля.
   */
  @OneToOne('ForgotPasswordCode', 'user', {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  public forgotPassword?: ForgotPasswordCode;
}
