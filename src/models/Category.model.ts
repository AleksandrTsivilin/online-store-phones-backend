'use strict';

import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  tableName: 'categories',
  timestamps: false,
})
export class Category extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
    title: string;
}
