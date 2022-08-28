const Sequelize = require("sequelize")
const database = require("../index")

const UsersAccountModel = database.define("user_account", {
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    references: {
      model: "users",
      key: "cpf",
    },
  },
  account: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  agency: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
  bank: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  saveBalance: {
    type: Sequelize.DECIMAL,
    allowNull: false,
  },
}, {
  timestamps: false,
  tableName: 'user_account'
})

module.exports = UsersAccountModel
