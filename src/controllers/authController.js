const { sign } = require("jsonwebtoken")
const UsersModel = require("../database/models/usersModel")
const bcrypt = require("bcrypt")
const UsersAccountModel = require("../database/models/usersAccountModel")

class AuthController {
  auth = async (req, res) => {
    const { email, password, rememberMe } = req.body

    const user = await UsersModel.findOne({
      where: { email: email.toLowerCase() },
    })

    const userAccount = await UsersAccountModel.findOne({
      where: { cpf: user.cpf },
    })

    if (!user) return res.status(404).json({ error: "NOT FOUND!" })

    const match = await bcrypt.compare(password, user.dataValues.password)
    if (!match) return res.status(401).json({ error: "UNAUTHORIZED!" })

    const token = sign({ userId: user.dataValues.id }, process.env.JWT_SECRET, {
      expiresIn: rememberMe ? "7d" : "1h",
    })
    const sendUser = { ...user.dataValues, userAccount: userAccount.dataValues }
    delete sendUser.password

    return res.status(200).json({ token, user: sendUser })
  }
}

module.exports = new AuthController()
