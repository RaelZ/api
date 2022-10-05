const Sequelize = require('sequelize')
require('dotenv').config()

let sequelize

if (process.env.DATABASE_URL !== null) {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      dialect: process.env.DB_DIAL,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    }
  )
} else {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  })
}

module.exports = sequelize
