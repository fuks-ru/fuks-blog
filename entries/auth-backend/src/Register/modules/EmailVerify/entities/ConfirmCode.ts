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

@Entity({ name: 'confirm-codes' })
@Unique(['user'])
export class ConfirmCode {
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
   * Url для перехода после активации.
   */
  @Column()
  public redirectFrom!: string;

  /**
   * Пользователь.
   */
  @OneToOne('User', 'confirmCode', {
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
