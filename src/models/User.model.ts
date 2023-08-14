'use strict';

import {
  AllowNull,
  Column,
  DataType,
  Default,
  HasOne,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Order } from './Order.model.js';

@Table({
  tableName: 'users',
  timestamps: false,
})

export class User extends Model {
  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @Unique
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    hashPassword: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    firstName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    lastName: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    defaultValue: 'user'
  })
    role: string;

  @HasOne(() => Order, {
    onDelete: 'CASCADE'
  })
    basket: Order | null;
}
