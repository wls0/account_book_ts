import { Sequelize } from 'sequelize'

const name = process.env.DB_NAME
const password = process.env.DB_PASSWORD
const DB = process.env.DB

interface IConfig {
  username: string
  password: string
  database: string
  host: string
  dialect: string
}

const config: IConfig = {
  username: name,
  password,
  database: DB,
  host: 'localhost',
  dialect: 'mysql',
}

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    username: name,
    password,
    database: DB,
    host: config.host,
    dialect: 'mysql',
    timezone: '+09:00',
  },
)
