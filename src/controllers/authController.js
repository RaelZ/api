const { sign } = require("jsonwebtoken")
const UsersModel = require("../database/models/usersModel")
const bcrypt = require("bcrypt")
const UsersAccountModel = require("../database/models/usersAccountModel")

class AuthController {
  auth = async (req, res) => {
    const { cpf, password, rememberMe } = req.body

    const user = await UsersModel.findOne({ where: { cpf: cpf } })
    if (!user) return res.status(404).json({ error: "NOT FOUND!" })
  
    const userAccount = await UsersAccountModel.findOne({ where: { cpf: cpf } }).then((userAcc) => userAcc)

    const match = await bcrypt.compare(password, user.dataValues.password)
    if (!match) return res.status(401).json({ error: "UNAUTHORIZED!" })

    const token = sign({ userId: user.dataValues.id }, process.env.JWT_SECRET, { expiresIn: rememberMe ? "7d" : "1h" })
    const sendUser = {
      ...user.dataValues,
      userAccount: userAccount?.dataValues || {
        account: "no Data",
        agency: "no Data",
        balance: "no Data",
        bank: "no Data",
        saveBalance: 0,
      },
    }
    delete sendUser.password

    return res.status(200).json({ token, user: sendUser })
  }
}

module.exports = new AuthController()
