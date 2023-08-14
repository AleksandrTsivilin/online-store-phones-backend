'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Namespace } from './Namespace.model.js';
import { Product } from './Product.model.js';

@Table({
  tableName: 'details',
  timestamps: false,
})
export class Detail extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Unique
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
    id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    resolution: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    processor: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    camera: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    zoom: string;

  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING)
  })
    cell: string[];

  @AllowNull(false)
  @ForeignKey(() => Namespace)
  @Column({
    type: DataType.INTEGER,
  })
    namespaceId: number;

  @HasOne(() => Product, {
    onDelete: 'CASCADE'
  })
    product: Product | null;

  @BelongsTo(() => Namespace, {
    onDelete: 'RESTRICT',
    foreignKey: 'namespaceId',
    targetKey: 'id',
  })
    namespace: Namespace | null;
}
