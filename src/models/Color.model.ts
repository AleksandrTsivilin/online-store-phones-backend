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
  tableName: 'colors',
  timestamps: false,
})
export class Color extends Model {
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
