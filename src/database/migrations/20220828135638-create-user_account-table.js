'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_account', {
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'cpf'
        }
      },
      account: {
        type: Sequelize.STRING,
        allowNull: false
      },
      agency: {
        type: Sequelize.STRING,
        allowNull: false
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      bank: {
        type: Sequelize.STRING,
        allowNull: false
      },
      saveBalance: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_account')
  }
}
