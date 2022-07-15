import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import type { User } from 'auth-backend/User/entities/User';

@Entity({ name: 'forgot-password-codes' })
@Unique(['user'])
export class ForgotPasswordCode {
  /**
   * ID.
   */
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  /**
   * Значение кода подтверждения.
   */
  @Column()
  public value!: string;

  /**
   * Url для перехода после смены пароля.
   */
  @Column()
  public redirectFrom!: string;

  /**
   * Пользователь.
   */
  @OneToOne('User', 'forgotPassword', {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  public user!: User;

  /**
   * Время обновления.
   */
  @UpdateDateColumn()
  public updatedAt!: Date;
}
