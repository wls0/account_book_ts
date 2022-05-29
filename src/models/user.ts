import { sequelize } from './index'
import { DataTypes, Model } from 'sequelize'
import Accounts from './accountlist'

export class User extends Model {
  index!: number
  id!: string
  password!: string
  salt!: string
}

const Users = sequelize.define<User>(
  'user',
  {
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: 'users',
  },
)

Users.hasOne(Accounts, {
  sourceKey: 'index',
  foreignKey: 'userIndex',
  onDelete: 'CASCADE',
})

export default Users
