const express = require('express')
const authController = require('../controllers/authController')

const auth = express.Router()

auth.post('/auth', authController.auth)

module.exports = auth
