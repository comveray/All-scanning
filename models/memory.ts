/*
 * Copyright (c) 2014-2022 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

/* jslint node: true */

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional
} from 'sequelize'
import { sequelize } from './index'
import UserModel from './user'

class MemoryModel extends Model<
InferAttributes<MemoryModel>,
InferCreationAttributes<MemoryModel>
> {
  declare UserId: number
  declare id: CreationOptional<number>
  declare caption: string
  declare imagePath: string
}

MemoryModel.init(
  {
    UserId:{
      type: DataTypes.INTEGER
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    caption: DataTypes.STRING,
    imagePath: DataTypes.STRING
  },
  {
    tableName: 'Memories',
    sequelize
  }
)

export default MemoryModel
