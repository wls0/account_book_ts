import { Sequelize, Model, DataTypes } from 'sequelize'

interface IAccount {
  userIndex: string
  bigCategory: string
  smallCategory: string
  card: string
  cost: number
  date: Date
}

export class Account extends Model implements IAccount {
  userIndex!: string
  bigCategory!: string
  smallCategory!: string
  card!: string
  cost!: number
  date!: Date
  readonly createdAt!: Date
  readonly updatedAt!: Date
}

const AccountModel = (sequelize: Sequelize): typeof Account => {
  Account.init({
    userIndex: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bigCategory: {
      type: DataTypes.STRING,
      allowNull: false
    },
    smallCategory: {
      type: DataTypes.STRING
    },
    card: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'account',
    modelName: 'account',
    sequelize
  })
  return Account
}

export { AccountModel }
