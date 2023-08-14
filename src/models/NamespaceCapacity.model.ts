'use strict';

import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import { Capacity } from './Capacity.model.js';
import { Namespace } from './Namespace.model.js';

@Table({
  tableName: 'namespacesCapacities',
  timestamps: false
})

export class NamespaceCapacity extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
    createdAt: Date;

  @AllowNull(true)
  @ForeignKey(() => Namespace)
  @Column({
    type: DataType.INTEGER,
  })
    namespaceId: number;

  @AllowNull(true)
  @ForeignKey(() => Capacity)
  @Column({
    type: DataType.INTEGER,
  })
    capacityId: number;

  @BelongsTo(() => Capacity, {
    onDelete: 'CASCADE',
    foreignKey: 'capacityId',
    targetKey: 'id',
  })
    capacity: Capacity | null;

  @BelongsTo(() => Namespace, {
    onDelete: 'CASCADE',
    foreignKey: 'namespaceId',
    targetKey: 'id',
  })
    namespace: Namespace | null;
}
