import { Dialect, Sequelize } from 'sequelize'
import { AccountModel } from './account'
import { UserModel } from './user'

interface IDBconfig{
  username: string
  password: string
  database: string
  host: string
  dialect: Dialect
}
const env: NodeJS.ProcessEnv = process.env
const username = env.DB_NAME
const password = env.DB_PWD
const database = env.DB
const host = env.DB_HOST
const dialect: Dialect = 'mysql'

const config: IDBconfig = {
  username,
  password,
  database,
  host,
  dialect
}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const DB = {
  sequelize,
  Account: AccountModel(sequelize),
  User: UserModel(sequelize)
}

DB.User.hasMany(DB.Account, { sourceKey: 'userId' })
DB.Account.belongsTo(DB.User, { foreignKey: 'userIndex' })

export default DB
