const bcrypt = require('bcrypt')
const UsersModel = require('../database/models/usersModel')
const {
  findByEmailOrCPF,
  strongPassword,
  statusResponse
} = require('../functions')

class UserController {
  async findAll(req, res) {
    return await UsersModel.findAll()
      .then((users) => {
        if (users.length > 0) return statusResponse(res, 200, users)
        return statusResponse(res, 204, users)
      })
      .catch((err) => statusResponse(res, 400, err))
  }
  e
  async findOne(req, res) {
    const { userId } = req.params
    return await UsersModel.findOne({ where: { id: userId } })
      .then((user) =>
        user
          ? res.status(200).json(user)
          : res.status(404).json({ user: 'NOT FOUND!' })
      )
      .catch((err) => res.status(400).json(err))
  }

  async create(req, res) {
    const { fullName, email, password, telephone, cpf } = req.body
    const hasEmailOrCPF = await findByEmailOrCPF(email, cpf)
    const hasStrong = strongPassword(fullName, email, password, cpf)

    if (hasEmailOrCPF)
      return res.status(400).json({ error: 'Email or CPF already exists!' })
    if (!hasStrong)
      return res.status(400).json({
        error:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character and must be at least 8 characters long. Password must not contain the user name, first name, last name,  or email.'
      })

    const passwordHash = await bcrypt.hash(password, 10)

    return await UsersModel.create({
      fullName,
      preferredName: fullName.split(' ')[0] || fullName,
      email: email.toLowerCase(),
      password: passwordHash,
      telephone,
      cpf
    })
      .then(async (user) => statusResponse(res, 200, user))
      .catch((err) => statusResponse(res, 400, err))
  }

  async update(req, res) {
    const { userId } = req.params
    return await UsersModel.update(req.body, { where: { id: userId } })
      .then((user) =>
        user ? res.status(200).json(user) : res.status(204).json(user)
      )
      .catch((err) => res.status(400).json(err))
  }

  async destroy(req, res) {
    const { userId } = req.params
    return await UsersModel.destroy({ where: { id: userId } })
      .then((user) => res.status(204).json(user))
      .catch((err) => res.status(400).json(err))
  }
}

module.exports = new UserController()
