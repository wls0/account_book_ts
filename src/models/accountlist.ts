import { sequelize } from './index'
import { DataTypes, Model } from 'sequelize'

export class Account extends Model {
  index!: number
  userIndex!: number
  bigCategory!: string
  smallCategory!: string
  card!: string
  cost!: number
  date!: Date
}

const Accounts = sequelize.define<Account>(
  'account',
  {
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userIndex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bigCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    smallCategory: {
      type: DataTypes.STRING,
    },
    card: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: 'accounts',
  },
)

export default Accounts
