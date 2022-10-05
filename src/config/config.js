require('dotenv').config()
const fs = require('fs')

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIAL,
    logging: true
  },
  test: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIAL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: true
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: process.env.DB_DIAL,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
}
