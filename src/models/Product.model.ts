'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderProducts } from './OrderProducts.model.js';
import { Category } from './Category.model.js';
import { Color } from './Color.model.js';
import { Detail } from './Detail.model.js';

@Table({
  tableName: 'products',
  timestamps: false,
})
export class Product extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    name: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
    fullPrice: number;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
    price: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    screen: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    capacity: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    ram: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
    year: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
    image: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
  })
    categoryId: number;

  @AllowNull(false)
  @ForeignKey(() => Color)
  @Column({
    type: DataType.INTEGER,
  })
    colorId: number;

  @BelongsTo(() => Category, {
    onDelete: 'RESTRICT',
    foreignKey: 'categoryId',
    targetKey: 'id',
  })
    category: Category | null;

  @BelongsTo(() => Color, {
    onDelete: 'RESTRICT',
    foreignKey: 'colorId',
    targetKey: 'id',
  })
    color: Color | null;

  @AllowNull(false)
  @ForeignKey(() => Detail)
  @Column({
    type: DataType.STRING
  })
    detailId: string;

  @BelongsTo(() => Detail, {
    onDelete: 'CASCADE'
  })
    detail: Detail | null;

  @HasMany(() => OrderProducts, {
    onDelete: 'RESTRICT',
  })
    basketProduct: OrderProducts[] | null;
}
