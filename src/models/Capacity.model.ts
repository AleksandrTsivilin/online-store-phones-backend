'use strict';

import {
  AllowNull,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  Unique,
} from 'sequelize-typescript';
import { NamespaceCapacity } from './NamespaceCapacity.model.js';

@Table({
  tableName: 'capacities',
  timestamps: false,
})

export class Capacity extends Model {
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
    capacity: string;

  @HasMany(() => NamespaceCapacity, {
    onDelete: 'SET NULL'
  })
    namespaceCapacities: NamespaceCapacity[] | null;
}
