'use strict';

import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Namespace } from './Namespace.model.js';

@Table({
  tableName: 'descriptions',
  timestamps: false,
})
export class Description extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    title: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
    text: string[];

  @AllowNull(false)
  @ForeignKey(() => Namespace)
  @Column({
    type: DataType.STRING,
  })
    namespaceId: number;
}
