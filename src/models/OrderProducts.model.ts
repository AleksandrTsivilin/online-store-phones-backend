'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Min,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from './Order.model.js';
import { Product } from './Product.model.js';

@Table({
  tableName: 'basketProducts',
  timestamps: false,
})

export class OrderProducts extends Model {
  @AllowNull(false)
  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(false)
  @Min(1)
  @Column({
    type: DataType.INTEGER,
  })
    quantity: number;

  @AllowNull(false)
  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
  })
    productId: number;

  @AllowNull(false)
  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
  })
    orderId: number;

  @BelongsTo(() => Order, {
    onDelete: 'CASCADE',
    foreignKey: 'orderId',
    targetKey: 'id',
  })
    order: Order | null;

  @BelongsTo(() => Product, {
    onDelete: 'CASCADE',
    foreignKey: 'productId',
    targetKey: 'id',
  })
    product: Product | null;
}
