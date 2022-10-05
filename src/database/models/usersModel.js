const Sequelize = require('sequelize')
const database = require('../index')

const UsersModel = database.define(
  'users',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    preferredName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telephone: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    monthlyRental: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    timestamps: false,
    tableName: 'users'
  }
)

module.exports = UsersModel
