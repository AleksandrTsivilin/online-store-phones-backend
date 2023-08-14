'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './User.model.js';

@Table({
  tableName: 'baskets',
  timestamps: false,
})

export class Order extends Model {
  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
    userId: number;

  @BelongsTo(() => User, {
    onDelete: 'CASCADE',
    foreignKey: 'userId',
    targetKey: 'id'
  })
    user: User | null;
}
