const express = require('express')
const UserAccountController = require('../controllers/userAccountController')
const { isAuth } = require('../middlewares/isAuth')

const userAccountRoute = express.Router()

userAccountRoute.post('/usersAccount/:userId', UserAccountController.create)
userAccountRoute.get('/usersAccount', isAuth, UserAccountController.findAll)
userAccountRoute.get('/usersAccount/:userId', isAuth, UserAccountController.findOne)
userAccountRoute.put('/usersAccount/:userId', isAuth, UserAccountController.update)
userAccountRoute.delete('/usersAccount/:userId', isAuth, UserAccountController.destroy)

module.exports = userAccountRoute
