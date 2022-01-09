const Sequelize = require('sequelize')
const env = process.env
const config = {
  username: env.DB_NAME,
  password: env.DB_PWD,
  database: env.DB,
  host: env.DB_HOST,
  dialect: env.DB_DIALECT
}
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config)

db.sequelize = sequelize
db.Sequelize = Sequelize

db.account = require('./accountlist')(sequelize, Sequelize)
db.user = require('./accountuser')(sequelize, Sequelize)

module.exports = db
