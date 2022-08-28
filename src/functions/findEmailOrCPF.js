const UsersModel = require("../database/models/usersModel")

const findByEmailOrCPF = async (email, cpf) => {
  const user = await UsersModel.count({
    where: {
      email,
      cpf,
    },
  })
  return user > 0
}

module.exports = { findByEmailOrCPF }