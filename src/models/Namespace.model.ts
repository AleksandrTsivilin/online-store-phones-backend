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
import { Description } from './Description.model.js';
import { ImagesColor } from './ImagesColor.model.js';
import { NamespaceCapacity } from './NamespaceCapacity.model.js';

@Table({
  tableName: 'namespaces',
  timestamps: false,
})
export class Namespace extends Model {
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

  @HasMany(() => NamespaceCapacity, {
    onDelete: 'SET NULL',
  })
    namespaceCapacities: NamespaceCapacity[] | null;

  @HasMany(() => ImagesColor, {
    onDelete: 'CASCADE',
  })
    images: ImagesColor[] | null;

  @HasMany(() => Description, {
    onDelete: 'CASCADE',
  })
    descriptions: Description[] | null;
}
