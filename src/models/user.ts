import { Sequelize, Model, DataTypes } from 'sequelize'

interface IUser {
  userId: string
  password: string
  salt: string
}

export class User extends Model implements IUser {
  userId!: string
  password!: string
  salt!: string

  readonly createdAt!: Date
  readonly updatedAt!: Date
}

const UserModel = (sequelize: Sequelize): typeof User => {
  User.init({
    userId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'user',
    modelName: 'user',
    sequelize
  })
  return User
}

export { UserModel }
