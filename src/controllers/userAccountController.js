const bcrypt = require("bcrypt")
const UsersAccountsModel = require("../database/models/usersAccountModel")
const UsersModel = require("../database/models/usersModel")

class UserController {
  async findAll(req, res) {
    return await UsersAccountsModel.findAll()
      .then((users) =>
        users.length > 0
          ? res.status(200).json(users)
          : res.status(204).json(users)
      )
      .catch((err) => res.status(400).json(err))
  }

  async findOne(req, res) {
    const { userId } = req.params
    const user = await UsersModel.findOne({ where: { id: userId } })

    const userAccount = await UsersAccountsModel.findOne({
      where: { cpf: user.dataValues.cpf },
    })
      .then((userAccount) => userAccount.dataValues)
      .catch(() => ({
        account: "no Data",
        agency: "no Data",
        balance: "no Data",
        bank: "no Data",
        saveBalance: 0,
      }))

    return res.status(200).json({ userAccount })
  }

  async create(req, res) {
    const { userId } = req.params
    const { account, agency, balance, bank, saveBalance } = req.body
    const user = await UsersModel.findOne({ where: { id: userId } })

    await UsersAccountsModel.create({
      cpf: user.dataValues.cpf,
      account,
      agency,
      balance,
      bank,
      saveBalance,
    })
      .then((userAccount) =>
        res
          .status(200)
          .json({ ...user.dataValues, userAccount: userAccount.dataValues })
      )
      .catch(() => res.status(400).json("Bad request"))
  }

  async update(req, res) {
    const { userId } = req.params
    const user = await UsersModel.findOne({ where: { id: userId } })

    await UsersAccountsModel.update(req.body, {
      where: { cpf: user.dataValues.cpf },
    })
      .then((userAccount) => res.status(200).json(userAccount))
      .catch(() => res.status(400).json("Bad request"))
  }

  async destroy(req, res) {
    const { userId } = req.params
    const user = await UsersModel.findOne({ where: { id: userId } })

    await UsersAccountsModel.destroy({
      where: { cpf: user.dataValues.cpf },
    })
      .then((userAccount) => res.status(200).json(userAccount))
      .catch(() => res.status(400).json("Bad request"))
  }
}

module.exports = new UserController()
